import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

const serviceArea = { north: 37.8120, south: 37.7080, east: -122.3550, west: -122.5150 };
const pickup = { lat: 37.7694, lng: -122.4862 };
const places = [
  { id: 'ferry', name: { en: 'Ferry Building', zh: '渡轮大厦' }, address: '1 Ferry Building', lat: 37.7955, lng: -122.3937 },
  { id: 'city-hall', name: { en: 'San Francisco City Hall', zh: '旧金山市政厅' }, mapName: { en: 'City Hall', zh: '市政厅' }, address: '1 Dr Carlton B Goodlett Pl', lat: 37.7793, lng: -122.4193 },
  { id: 'library', name: { en: 'San Francisco Public Library', zh: '旧金山公共图书馆' }, mapName: { en: 'Public Library', zh: '公共图书馆' }, address: '100 Larkin St', lat: 37.7791, lng: -122.4158 },
].filter(({ lat, lng }) =>
  lat >= serviceArea.south && lat <= serviceArea.north &&
  lng >= serviceArea.west && lng <= serviceArea.east
);

const copy = {
  en: {
    title: 'Autonomous Delivery App',
    back: 'Back to the project',
    language: 'Language',
    intro: 'Choose a fixed sample address in San Francisco, then step through a simulated delivery on a schematic map.',
    choose: 'Choose an address',
    address: 'Sample delivery address',
    placeholder: 'Search landmarks or addresses',
    hint: 'Choose a sample from the list. Try “Ferry” or “Larkin”.',
    empty: 'No matching sample addresses.',
    selected: 'Selected address',
    start: 'Start sample tracking',
    tracking: 'Sample tracking map',
    mapDescription: 'A schematic map of the San Francisco service area.',
    mapReady: 'Select an address and start sample tracking to see the connection.',
    mapActive: 'The dashed line connects the sample pickup and drop-off points.',
    origin: 'Sample pickup',
    destination: 'Drop-off',
    serviceArea: 'Service area',
    bay: 'San Francisco Bay',
    vehicle: 'Sample vehicle',
    next: 'Advance sample status',
    restart: 'Restart sample tracking',
    status: ['Ready for pickup', 'In transit', 'Delivered'],
  },
  zh: {
    title: '自主配送应用',
    back: '返回项目详情',
    language: '语言',
    intro: '选择一个预设的旧金山示例地址，在示意地图上逐步查看模拟配送过程。',
    choose: '选择地址',
    address: '示例配送地址',
    placeholder: '搜索地标或地址',
    hint: '请从列表选择，可输入「渡轮」或「Larkin」试试。',
    empty: '没有匹配的示例地址。',
    selected: '已选地址',
    start: '开始模拟追踪',
    tracking: '模拟配送地图',
    mapDescription: '旧金山配送范围示意图。',
    mapReady: '选择地址并开始模拟追踪，即可查看起点与送达点的连线。',
    mapActive: '虚线连接模拟取件点和送达点。',
    origin: '模拟取件点',
    destination: '送达点',
    serviceArea: '配送范围',
    bay: '旧金山湾',
    vehicle: '模拟配送车辆',
    next: '推进模拟配送状态',
    restart: '重新开始模拟追踪',
    status: ['等待取件', '配送中', '已送达'],
  },
};

function preferredLanguage() {
  let saved;
  try { saved = localStorage.getItem('hao-language'); } catch {}
  if (saved === 'en' || saved === 'zh') return saved;
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

function AddressPicker({ language, text, selected, onChange }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const matches = places.filter(place =>
    [place.name.en, place.name.zh, place.address].some(value =>
      value.toLowerCase().includes(query.trim().toLowerCase())
    )
  );
  const showOptions = open && !selected;
  const expanded = showOptions && matches.length > 0;
  const optionId = place => `sample-${place.id}`;

  function choose(place) {
    setQuery('');
    setOpen(false);
    setActive(-1);
    onChange(place);
  }

  function handleKey(event) {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (selected || !matches.length) return;
      event.preventDefault();
      setOpen(true);
      const next = event.key === 'ArrowDown'
        ? (active + 1) % matches.length
        : (active <= 0 ? matches.length - 1 : active - 1);
      setActive(next);
    }
    if (event.key === 'Escape' && showOptions) {
      event.preventDefault();
      setOpen(false);
      setActive(-1);
    }
    if (event.key === 'Enter' && showOptions && matches[active]) {
      event.preventDefault();
      choose(matches[active]);
    }
  }

  return (
    <div className="picker">
      <label htmlFor="delivery-address">{text.address}</label>
      <input
        id="delivery-address"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-controls="sample-addresses"
        aria-activedescendant={showOptions && matches[active] ? optionId(matches[active]) : undefined}
        aria-describedby="address-hint"
        autoComplete="off"
        placeholder={text.placeholder}
        value={selected?.name[language] ?? query}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onBlur={() => { setOpen(false); setActive(-1); }}
        onChange={event => {
          setQuery(event.target.value);
          setOpen(true);
          setActive(-1);
          onChange(null);
        }}
        onKeyDown={handleKey}
      />
      <p id="address-hint" className="field-hint">{text.hint}</p>
      <ul id="sample-addresses" role="listbox" aria-label={text.address} hidden={!expanded}>
        {matches.map((place, index) => (
          <li
            key={place.id}
            id={optionId(place)}
            role="option"
            aria-selected={index === active}
            onPointerDown={event => event.preventDefault()}
            onClick={() => choose(place)}
          >
            <strong>{place.name[language]}</strong>
            <span>{place.address}</span>
          </li>
        ))}
      </ul>
      {showOptions && !matches.length && <p className="field-hint" role="status">{text.empty}</p>}
      {selected && <p className="selected" role="status">{text.selected} <strong>{selected.address}</strong></p>}
    </div>
  );
}

const mapWidth = 720;
const mapHeight = 450;
const mapScale = 2;

function mapPoint({ lat, lng }) {
  return {
    x: 52 + (lng - serviceArea.west) / (serviceArea.east - serviceArea.west) * (mapWidth - 104),
    y: 42 + (serviceArea.north - lat) / (serviceArea.north - serviceArea.south) * (mapHeight - 84),
  };
}

function mapLabelPosition(point) {
  return { left: `${point.x / mapWidth * 100}%`, top: `${point.y / mapHeight * 100}%` };
}

function drawMap(canvas, destination, step) {
  const css = getComputedStyle(canvas);
  const color = name => css.getPropertyValue(`--map-${name}`).trim();
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.setTransform(mapScale, 0, 0, mapScale, 0, 0);
  ctx.fillStyle = color('water');
  ctx.fillRect(0, 0, mapWidth, mapHeight);

  // A schematic shoreline underneath the actual projected sample coordinates.
  const shoreline = [[118,450], [122,290], [147,137], [224,139], [271,98], [389,82],
    [467,80], [523,91], [536,174], [525,242], [571,257], [546,311], [550,365], [605,450]];
  ctx.save();
  ctx.beginPath();
  shoreline.forEach(([x, y], index) => index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
  ctx.closePath();
  ctx.fillStyle = color('land');
  ctx.fill();
  ctx.clip();
  ctx.strokeStyle = color('grid');
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 138; x < 620; x += 24) {
    ctx.moveTo(x, 90);
    ctx.lineTo(x - 18, 450);
  }
  for (let y = 110; y < 450; y += 24) {
    ctx.moveTo(110, y);
    ctx.lineTo(620, y + 8);
  }
  ctx.stroke();
  ctx.fillStyle = color('park');
  ctx.fillRect(143, 184, 184, 55);
  ctx.restore();

  const topLeft = mapPoint({ lat: serviceArea.north, lng: serviceArea.west });
  ctx.strokeStyle = color('boundary');
  ctx.lineWidth = 1.5;
  ctx.strokeRect(topLeft.x, topLeft.y, mapWidth - 104, mapHeight - 84);

  function dot({ x, y }, fill, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color(fill);
    ctx.fill();
    ctx.strokeStyle = color('ring');
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  const start = mapPoint(pickup);
  if (!destination) {
    dot(start, 'pickup', 8);
    return;
  }
  const end = mapPoint(destination);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.strokeStyle = color('route');
  ctx.lineWidth = 4;
  ctx.setLineDash([9, 7]);
  ctx.stroke();
  ctx.setLineDash([]);
  dot(start, 'pickup', 8);
  dot(end, 'dropoff', 8);
  if (step === 1) {
    const x = (start.x + end.x) / 2;
    const y = (start.y + end.y) / 2;
    ctx.beginPath();
    ctx.moveTo(x - 19, y - 12);
    ctx.lineTo(x + 8, y - 12);
    ctx.lineTo(x + 20, y - 3);
    ctx.lineTo(x + 20, y + 10);
    ctx.lineTo(x - 19, y + 10);
    ctx.closePath();
    ctx.fillStyle = color('route');
    ctx.fill();
    ctx.strokeStyle = color('ring');
    ctx.lineWidth = 2;
    ctx.stroke();
    dot({ x: x - 10, y: y + 10 }, 'pickup', 5);
    dot({ x: x + 11, y: y + 10 }, 'pickup', 5);
  }
}

function TrackingMap({ text, language, destination, step }) {
  const canvas = useRef(null);
  const boundsCorner = mapPoint({ lat: serviceArea.north, lng: serviceArea.west });
  const description = [text.mapDescription, text.origin];
  if (destination) description.push(text.destination, destination.name[language]);
  if (step === 1) description.push(text.vehicle);
  useEffect(() => {
    const preference = matchMedia('(prefers-color-scheme: dark)');
    const render = () => drawMap(canvas.current, destination, step);
    render();
    preference.addEventListener('change', render);
    return () => preference.removeEventListener('change', render);
  }, [destination, step]);

  return (
    <figure>
      <div className="map">
        <canvas ref={canvas} width={mapWidth * mapScale} height={mapHeight * mapScale} role="img" aria-label={description.join(' ')} />
        <div className="map-annotations" aria-hidden="true">
          <span className="map-service" style={mapLabelPosition(boundsCorner)}>{text.serviceArea}</span>
          <span className="map-bay">{text.bay}</span>
          <span className="map-pickup" style={mapLabelPosition(mapPoint(pickup))}>{text.origin}</span>
          {destination && (
            <span className="map-dropoff" style={mapLabelPosition(mapPoint(destination))}>{(destination.mapName || destination.name)[language]}</span>
          )}
        </div>
      </div>
      <figcaption>
        <p>{destination ? text.mapActive : text.mapReady}</p>
      </figcaption>
    </figure>
  );
}

function App() {
  const [language, setLanguage] = useState(preferredLanguage);
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(null);
  const trackingHeading = useRef(null);
  const text = copy[language];
  const tracking = step !== null;

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-Hans' : 'en';
    document.title = language === 'zh' ? '自主配送应用｜演示' : 'Autonomous Delivery App | Demo';
  }, [language]);

  function changeLanguage(value) {
    setLanguage(value);
    try { localStorage.setItem('hao-language', value); } catch {}
  }

  function changeAddress(place) {
    setSelected(place);
    setStep(null);
  }

  function startTracking() {
    setStep(0);
    trackingHeading.current.focus();
  }

  return (
    <main>
      <nav>
        <a href="../../#project/autonomous-delivery">{text.back}</a>
        <div className="languages" role="group" aria-label={text.language}>
          <button type="button" lang="en" aria-pressed={language === 'en'} onClick={() => changeLanguage('en')}>English</button>
          <button type="button" lang="zh-Hans" aria-pressed={language === 'zh'} onClick={() => changeLanguage('zh')}>中文</button>
        </div>
      </nav>
      <h1>{text.title}</h1>
      <p className="intro">{text.intro}</p>
      <div className="delivery">
        <section className="address-panel" aria-labelledby="choose-address">
          <h2 id="choose-address"><span aria-hidden="true">1</span>{text.choose}</h2>
          <AddressPicker language={language} text={text} selected={selected} onChange={changeAddress} />
          <button type="button" className="action" disabled={!selected || tracking} onClick={startTracking}>{text.start}</button>
        </section>
        <section className="tracking-panel" aria-labelledby="tracking-title">
          <h2 id="tracking-title" tabIndex={-1} ref={trackingHeading}><span aria-hidden="true">2</span>{text.tracking}</h2>
          <TrackingMap text={text} language={language} destination={tracking ? selected : null} step={step} />
          <div className="tracking-status" role="status">
            {tracking && <><strong>{text.status[step]}</strong><span>{selected.name[language]}</span></>}
          </div>
          {tracking && (
            <button type="button" className="action" onClick={() => setStep((step + 1) % text.status.length)}>
              {step === text.status.length - 1 ? text.restart : text.next}
            </button>
          )}
        </section>
      </div>
    </main>
  );
}

createRoot(document.querySelector('#root')).render(<App />);
