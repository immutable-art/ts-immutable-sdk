import { Box } from '@biom3/react';
import { useEffect } from 'react';
import {
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from '@rive-app/react-canvas-lite';

export function HandoverAnimation({
  url,
  inputValue = 0,
}: {
  url: string;
  inputValue?: number;
}) {
  const STATE_MACHINE_NAME = 'State';
  const INPUT_NAME = 'mode';

  const riveParams = {
    src: url,
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain }),
    stateMachines: STATE_MACHINE_NAME,
  };

  const { rive, RiveComponent } = useRive(riveParams);
  const input = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_NAME);

  useEffect(() => {
    if (rive && input) {
      console.log('@@@', rive.contents);
      console.log('@@@ url', url);
      console.log('@@@ inputValue', inputValue);

      input.value = inputValue;
    }
  }, [rive, inputValue, url, input]);

  return (
    <Box
      sx={{
        h: '240px',
        flexShrink: 0,
      }}
      rc={<RiveComponent />}
    />
  );
}
