import { GridGenerator } from 'react-hexgrid';
import configs from '../configurations';

export const config = configs['rectangle'];
export const generator = GridGenerator.getGenerator(config.map);
export const hexagons = generator.apply(this, config.mapProps);

export const addIdToHexes = () => {
  const polyIdDivs = [...document.getElementsByClassName('poly-id')];
  polyIdDivs.forEach(polyIdDiv => {
    const poly = polyIdDiv.parentNode.firstChild;
    poly.id = polyIdDiv.id;
    polyIdDiv.remove();
  });
};
