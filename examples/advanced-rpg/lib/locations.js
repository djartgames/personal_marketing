import { Location } from 'edwin';
import { guard, merchant } from './npcs.js';
import { healingHerb, rustySword } from './items.js';
import villageImg from '../assets/images/locations/village.png';
import forestEdgeImg from '../assets/images/locations/forest_edge.png';
import darkForestImg from '../assets/images/locations/dark_forest.png';
import citadelGateImg from '../assets/images/locations/citadel_gate.png';
import vaultImg from '../assets/images/locations/vault.png';

const village = new Location({
  id: 'village',
  name: 'Thornwick Village',
  description:
    'A quiet hamlet nestled between rolling hills. Smoke rises from chimneys, ' +
    'and merchants hawk their goods in the narrow lane.',
  image: villageImg,
  paths: { north: { target: 'citadel_gate', label: '↑ North' }, east: { target: 'forest_edge', label: '→ East' } },
  npcs: [merchant],
});

const forestEdge = new Location({
  id: 'forest_edge',
  name: 'Forest Edge',
  description:
    'Tall oaks press close on either side. Shafts of morning light pierce the canopy. ' +
    'A healing herb grows at the base of an old stump.',
  image: forestEdgeImg,
  paths: { west: { target: 'village', label: '← West' }, deeper: { target: 'dark_forest', label: 'Deeper' } },
  items: [healingHerb, rustySword],
});

const darkForest = new Location({
  id: 'dark_forest',
  name: 'Dark Forest',
  description:
    'The trees close in and the light dies. Strange sounds echo in the distance.',
  image: darkForestImg,
  paths: { back: { target: 'forest_edge', label: 'Back' } },
});

const citadelGate = new Location({
  id: 'citadel_gate',
  name: 'Citadel Gate',
  description:
    'A massive iron gate bars entry to the ancient citadel. A guard stands watch, ' +
    'hand resting on the pommel of his sword.',
  image: citadelGateImg,
  paths: { south: { target: 'village', label: '↓ South' }, inside: { target: 'vault', label: 'Inside' } },
  npcs: [guard],
});

const vault = new Location({
  id: 'vault',
  name: 'The Moon Vault',
  description:
    'A circular chamber lit by silver torches. Ancient runes cover the walls. ' +
    'A pedestal at the centre holds a glowing artefact.',
  image: vaultImg,
  paths: { out: { target: 'citadel_gate', label: '⤴ Out' } },
});

export { village, forestEdge, darkForest, citadelGate, vault };
