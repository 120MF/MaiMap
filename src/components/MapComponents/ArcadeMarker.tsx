import { useArcades } from '@/stores/useArcades.tsx';
import { MultiMarker } from 'tlbs-map-react';

import arcadeDeadSelectedIcon from '@/assets/nail-arcade-dead-selected.png';
import arcadeDeadIcon from '@/assets/nail-arcade-dead.png';
import arcadeSelectedIcon from '@/assets/nail-arcade-selected.png';
import arcadeIcon from '@/assets/nail-arcade.png';
import { useCallback } from 'react';

interface MarkerEvent {
  geometry: {
    id: string;
  };
}

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
  const { nearbyArcades, arcadeId, update_arcadeId } = useArcades();
  const geometriesData = nearbyArcades.map((arcade) => {
    return {
      id: arcade.arcade_id.toString(),
      styleId:
        arcadeId === arcade.arcade_id
          ? arcade.arcade_dead
            ? 'SelectedDeadArcade'
            : 'SelectedArcade'
          : arcade.arcade_dead
            ? 'DeadArcade'
            : 'Arcade',
      position: { lat: arcade.arcade_lat, lng: arcade.arcade_lng },
    };
  });
  const onClickHandler = useCallback(
    (event: MarkerEvent) => {
      update_arcadeId(Number.parseInt(event.geometry.id));
    },
    [update_arcadeId],
  );

  return (
    <MultiMarker
      geometries={geometriesData}
      styles={styles}
      onClick={onClickHandler}
    />
  );
}

export default ArcadeMarkers;
