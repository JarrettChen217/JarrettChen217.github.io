// Fixed questions, preassigned relevance labels and the recorded top-four rankings.
const recordedRun = {
  "questions": [
    {
      "id": "Q01",
      "question": "What does a negative slope mean on a cart's position versus time graph?",
      "gold": [
        "C01"
      ]
    },
    {
      "id": "Q02",
      "question": "How do I get displacement from a velocity trace and impulse from a force trace?",
      "gold": [
        "C02",
        "C07"
      ]
    },
    {
      "id": "Q03",
      "question": "When the tow ropes pull equally in opposite directions, can the moving trolley keep rolling?",
      "gold": [
        "C03"
      ]
    },
    {
      "id": "Q04",
      "question": "What sets the maximum friction before a crate starts sliding?",
      "gold": [
        "C04"
      ]
    },
    {
      "id": "Q05",
      "question": "A sideways push is always perpendicular to the path. Does it transfer kinetic energy through work?",
      "gold": [
        "C05"
      ]
    },
    {
      "id": "Q06",
      "question": "Two wagons couple together on impact. What fixes their common speed after they latch?",
      "gold": [
        "C06"
      ]
    },
    {
      "id": "Q07",
      "question": "If I lengthen the contact time for the same change of momentum, what happens to the average push?",
      "gold": [
        "C07"
      ]
    },
    {
      "id": "Q08",
      "question": "Compare how adding mass changes the period of a pendulum versus a cart on a spring.",
      "gold": [
        "C08",
        "C09"
      ]
    },
    {
      "id": "Q09",
      "question": "How does doubling the voltage change the stored energy between the two plates?",
      "gold": [
        "C10"
      ]
    },
    {
      "id": "Q10",
      "question": "Another resistor joins a single loop fed by the same battery. Does the current increase or decrease?",
      "gold": [
        "C11"
      ]
    },
    {
      "id": "Q11",
      "question": "A light beam enters an optically denser material at an angle. Which way does it turn?",
      "gold": [
        "C12"
      ]
    },
    {
      "id": "Q12",
      "question": "How does temperature change the electrical resistance of a copper wire?",
      "gold": []
    }
  ],
  "passages": {
    "C01": {
      "title": "Velocity from a graph",
      "text": "A cart moves along a straight rail. The slope of its position versus time graph is its signed velocity. A horizontal segment means the cart is stationary. A negative slope means it travels toward decreasing position, even if it stays to the right of the origin."
    },
    "C02": {
      "title": "Acceleration from a graph",
      "text": "On a velocity versus time plot, slope measures acceleration. Signed area under the trace gives displacement. A cart moving backward can speed up when both its velocity and its acceleration are negative."
    },
    "C03": {
      "title": "Forces on a cart",
      "text": "The vector sum of the external forces on a cart equals its mass times its acceleration. If the horizontal pulls balance, horizontal acceleration is zero. The cart can still move at constant velocity."
    },
    "C04": {
      "title": "Dry friction",
      "text": "Static friction adjusts up to a limiting value before a crate slips. After sliding begins, kinetic friction opposes relative motion along the contact surface. The static limit is the coefficient of static friction times the normal force."
    },
    "C05": {
      "title": "Work and energy",
      "text": "Net work changes kinetic energy. Compute work by taking the component of a force along the displacement and multiplying by the distance when that force is constant. A force perpendicular to motion does no work."
    },
    "C06": {
      "title": "Momentum during impact",
      "text": "In a brief impact, total momentum of two carts is conserved if the external impulse is negligible. When the carts stick together, their final shared velocity is initial total momentum divided by combined mass. Kinetic energy need not be conserved."
    },
    "C07": {
      "title": "Impulse from a graph",
      "text": "The signed area under a force versus time curve gives impulse, which equals the change in momentum. For the same momentum change, increasing the contact duration lowers the magnitude of the average force."
    },
    "C08": {
      "title": "Spring oscillator",
      "text": "For a mass sliding on a frictionless rail attached to an ideal spring, the restoring force points back toward equilibrium. The oscillation period is proportional to the square root of mass divided by spring stiffness. A stiffer spring shortens the period."
    },
    "C09": {
      "title": "Pendulum oscillator",
      "text": "For a small angular displacement, a simple pendulum has a period proportional to the square root of length divided by gravitational acceleration. Doubling the bob mass alone leaves this period unchanged."
    },
    "C10": {
      "title": "Energy in a capacitor",
      "text": "Two parallel conducting plates separated by an insulator store separated charge. For a capacitor of capacitance C at voltage V, the stored energy is one half of C times V squared. At fixed capacitance, doubling the voltage quadruples the energy."
    },
    "C11": {
      "title": "Series circuit",
      "text": "At steady state in a single unbranched loop, the same current passes through every resistor. Resistances in series add. With a fixed battery voltage, adding positive resistance reduces that common current."
    },
    "C12": {
      "title": "Refraction at a boundary",
      "text": "Light crossing into a medium with higher refractive index slows down. At oblique incidence it bends toward the normal. Frequency stays the same across the boundary while wavelength decreases."
    }
  },
  "runs": {
    "docker-demo": {
      "model": "text-embedding-3-small",
      "rankings": {
        "Q01": [
          "C01",
          "C02",
          "C03",
          "C07"
        ],
        "Q02": [
          "C07",
          "C02",
          "C05",
          "C01"
        ],
        "Q03": [
          "C03",
          "C06",
          "C04",
          "C08"
        ],
        "Q04": [
          "C04",
          "C08",
          "C06",
          "C03"
        ],
        "Q05": [
          "C05",
          "C03",
          "C07",
          "C06"
        ],
        "Q06": [
          "C06",
          "C04",
          "C03",
          "C08"
        ],
        "Q07": [
          "C07",
          "C06",
          "C05",
          "C08"
        ],
        "Q08": [
          "C09",
          "C08",
          "C03",
          "C06"
        ],
        "Q09": [
          "C10",
          "C11",
          "C08",
          "C09"
        ],
        "Q10": [
          "C11",
          "C10",
          "C08",
          "C12"
        ],
        "Q11": [
          "C12",
          "C05",
          "C01",
          "C07"
        ],
        "Q12": [
          "C11",
          "C12",
          "C04",
          "C10"
        ]
      }
    },
    "main": {
      "model": "text-embedding-ada-002",
      "rankings": {
        "Q01": [
          "C01",
          "C02",
          "C03",
          "C07"
        ],
        "Q02": [
          "C07",
          "C02",
          "C01",
          "C06"
        ],
        "Q03": [
          "C03",
          "C06",
          "C08",
          "C01"
        ],
        "Q04": [
          "C04",
          "C08",
          "C03",
          "C07"
        ],
        "Q05": [
          "C05",
          "C03",
          "C06",
          "C01"
        ],
        "Q06": [
          "C06",
          "C03",
          "C04",
          "C07"
        ],
        "Q07": [
          "C07",
          "C06",
          "C08",
          "C03"
        ],
        "Q08": [
          "C08",
          "C09",
          "C03",
          "C06"
        ],
        "Q09": [
          "C10",
          "C11",
          "C05",
          "C06"
        ],
        "Q10": [
          "C11",
          "C10",
          "C09",
          "C08"
        ],
        "Q11": [
          "C12",
          "C09",
          "C07",
          "C08"
        ],
        "Q12": [
          "C11",
          "C10",
          "C12",
          "C05"
        ]
      }
    },
    "offline": {
      "model": "all-MiniLM-L6-v2",
      "rankings": {
        "Q01": [
          "C01",
          "C02",
          "C03",
          "C07"
        ],
        "Q02": [
          "C07",
          "C02",
          "C01",
          "C05"
        ],
        "Q03": [
          "C03",
          "C01",
          "C02",
          "C06"
        ],
        "Q04": [
          "C04",
          "C01",
          "C03",
          "C08"
        ],
        "Q05": [
          "C05",
          "C03",
          "C01",
          "C07"
        ],
        "Q06": [
          "C06",
          "C07",
          "C03",
          "C01"
        ],
        "Q07": [
          "C07",
          "C06",
          "C08",
          "C04"
        ],
        "Q08": [
          "C09",
          "C08",
          "C03",
          "C02"
        ],
        "Q09": [
          "C10",
          "C11",
          "C05",
          "C09"
        ],
        "Q10": [
          "C11",
          "C09",
          "C07",
          "C10"
        ],
        "Q11": [
          "C12",
          "C03",
          "C01",
          "C08"
        ],
        "Q12": [
          "C11",
          "C12",
          "C05",
          "C10"
        ]
      }
    }
  }
};
