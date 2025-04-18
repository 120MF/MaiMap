import { useArcades } from '@/stores/useArcades.tsx';
import { MultiMarker } from 'tlbs-map-react';

import arcadeDeadSelectedIcon from '@/assets/nail-arcade-dead-selected.png';
import arcadeDeadIcon from '@/assets/nail-arcade-dead.png';
import arcadeSelectedIcon from '@/assets/nail-arcade-selected.png';
import arcadeIcon from '@/assets/nail-arcade.png';

const styles = {
  Arcade: {
    width: 30,
    height: 50,
    anchor: { x: 10, y: 30 },
    src: arcadeIcon, // 使用导入的图片变量
  },
  SelectedArcade: {
    width: 30,
    height: 50,
    anchor: { x: 10, y: 30 },
    src: arcadeSelectedIcon,
  },
  DeadArcade: {
    width: 30,
    height: 50,
    anchor: { x: 10, y: 30 },
    src: arcadeDeadIcon,
  },
  SelectedDeadArcade: {
    width: 30,
    height: 50,
    anchor: { x: 10, y: 30 },
    src: arcadeDeadSelectedIcon,
  },
};

function ArcadeMarkers() {
  const { nearbyArcades } = useArcades();
  const geometriesData = nearbyArcades.map((arcade) => {
    return {
      styleId: arcade.arcade_dead ? 'DeadArcade' : 'Arcade',
      position: { lat: arcade.arcade_lat, lng: arcade.arcade_lng },
    };
  });

  return <MultiMarker geometries={geometriesData} styles={styles} />;
}

export default ArcadeMarkers;
