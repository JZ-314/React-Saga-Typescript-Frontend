import React from 'react';
import Switch from '../../../components/switch';
import Range from '../../../components/range';
import Dropdown from './dropdown';

const attentionValues = ['Attention Value', 'Voice Indicator', 'Behavior Indicator'];

const videoSettings = ['Luminance', 'Saturation', 'Background Blur', 'Clarity'];

const callSettings = ['NotePad', 'Timer', 'Web', 'Voice Indicator Detail', 'Behavior details'];

const ColumnSettings = () => {
  return (
    <>
      <div className="pb-4">
        <Dropdown title="Call Settings">
          <div>
            {attentionValues.map((value) => (
              <div className="pt-3" key={value}>
                <Switch label={value} />
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
      <div className="pb-4">
        <Dropdown title="Video Settings">
          <div>
            {videoSettings.map((value) => (
              <div className="pt-3" key={value}>
                <Range label={value} id={value} />
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
      <div>
        <Dropdown title="Call Settings">
          <div>
            {callSettings.map((value) => (
              <div className="pt-3" key={value}>
                <Switch label={value} />
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
    </>
  );
};

export default ColumnSettings;
