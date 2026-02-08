import type { App } from 'vue';
import './styles/index.css';

import Button from './components/Button/Button.vue';
import Checkbox from './components/Checkbox/Checkbox.vue';
import Icon from './components/Icon/Icon.vue';

export { Button, Checkbox, Icon };

const components = [Button, Checkbox, Icon];

export const NestroUI = {
  install(app: App) {
    components.forEach((c) => {
      app.component(c.name!, c);
    });
  },
};

export default NestroUI;

// export { default as Button } from './components/Button/Button.vue';
// import './styles/index.css';
// export * from './components/Button';
// export { default as Icon } from './components/Icon/Icon.vue';
// export { default as Dropdown } from './components/Dropdown/Dropdown.vue';
// export { default as Checkbox } from './components/Checkbox/Checkbox.vue';
// export { default as Switch } from './components/Switch/Switch.vue';
// export { default as Input } from './components/Input/Input.vue';
// export { default as RangeSlider } from './components/RangeSlider/RangeSlider.vue';
// export { default as ProgressBar } from './components/ProgressBar/ProgressBar.vue';
// export { default as Loader } from './components/Loader/Loader.vue';
// export { default as Workplace } from './components/Workplace.vue';
// export { default as ColorPalette } from './components/ColorPalette.vue';
// export { default as MultiSelect } from './components/MultiSelect.vue';
// export { default as CurrentScenario } from './components/CurrentScenario.vue';
// export { default as SegmentedControl } from './components/SegmentedControl/SegmentedControl.vue';
// export { default as RadioButton } from './components/RadioButton/RadioButton.vue';
// export { default as RadioGroup } from './components/RadioGroup/RadioGroup.vue';
// export { default as SectionWrapper } from './components/SectionWrapper/SectionWrapper.vue';
// export { default as Modal } from './components/Modal/Modal.vue';
// export { default as Tooltip } from './components/Tooltip/Tooltip.vue';

// Types
// export type { SegmentedControlOption } from './components/SegmentedControl/SegmentedControl.vue';
// export type { RadioGroupOption } from './components/RadioGroup/RadioGroup.vue';
