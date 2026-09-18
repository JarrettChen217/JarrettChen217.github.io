const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');

const workflow = yaml.load(
  fs.readFileSync(path.join(__dirname, '../.github/workflows/pages.yml'), 'utf8'),
  { schema: yaml.JSON_SCHEMA },
);

function actionStep(job, action) {
  return workflow.jobs[job].steps.find(step => step.uses?.startsWith(`${action}@`));
}

test('Pages workflow uses current Node 24 actions and preserves .nojekyll', () => {
  assert.equal(actionStep('quality-gate', 'actions/upload-artifact').uses, 'actions/upload-artifact@v7');
  const pagesUpload = actionStep('quality-gate', 'actions/upload-pages-artifact');
  assert.equal(pagesUpload.uses, 'actions/upload-pages-artifact@v5');
  assert.equal(pagesUpload.with['include-hidden-files'], true);
  assert.equal(actionStep('deploy', 'actions/configure-pages').uses, 'actions/configure-pages@v6');
  assert.equal(actionStep('deploy', 'actions/deploy-pages').uses, 'actions/deploy-pages@v5');
});
