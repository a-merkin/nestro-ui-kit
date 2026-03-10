import type { App } from 'vue';
import './styles/index.css';

// Компоненты
import Button from './components/Button/Button.vue';
import Checkbox from './components/Checkbox/Checkbox.vue';
import Icon from './components/Icon/Icon.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import Input from './components/Input/Input.vue';
import InputNumber from './components/InputNumber/InputNumber.vue';
import Loader from './components/Loader/Loader.vue';
import Menu from './components/Menu/Menu.vue';
import ProgressBar from './components/ProgressBar/ProgressBar.vue';
import WorkPlace from './components/WorkPlace/WorkPlace.vue';
import RadioButton from './components/RadioButton/RadioButton.vue';
import RadioGroup from './components/RadioGroup/RadioGroup.vue';
import RangeSlider from './components/RangeSlider/RangeSlider.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
import SidebarFilters from './components/SidebarFilters/SidebarFilters.vue';
import DatePicker from './components/DatePicker/DatePicker.vue';
import SpeedDial from './components/SpeedDial/SpeedDial.vue';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog.vue';
import Toolbar from './components/Toolbar/Toolbar.vue';
import Chip from './components/Chip/Chip.vue';
import SearchFilterPanel from './components/SearchFilterPanel/SearchFilterPanel.vue';
import NavBar from './components/NavBar/NavBar.vue';

// Примитивные компоненты
import Box from './components/primitives/Box/Box.vue';
import Flex from './components/primitives/Flex/Flex.vue';
import Heading from './components/primitives/Heading/Heading.vue';
import Label from './components/primitives/Label/Label.vue';
import Stack from './components/primitives/Stack/Stack.vue';
import Text from './components/primitives/Text/Text.vue';

// Экспорт компонентов для named import
export {
  Button,
  Checkbox,
  Icon,
  Dropdown,
  Input,
  InputNumber,
  Loader,
  Menu,
  ProgressBar,
  WorkPlace,
  RadioButton,
  RadioGroup,
  RangeSlider,
  Tooltip,
  SpeedDial,
  Chip,
  ConfirmDialog,
  Toolbar,
  SidebarFilters,
  DatePicker,
  SearchFilterPanel,
  NavBar,
  Box,
  Flex,
  Heading,
  Label,
  Stack,
  Text,
};

// Список для глобальной регистрации через install
const components = [
  Button,
  Checkbox,
  Icon,
  Dropdown,
  Input,
  InputNumber,
  Loader,
  Menu,
  ProgressBar,
  WorkPlace,
  RadioButton,
  RadioGroup,
  RangeSlider,
  Tooltip,
  SpeedDial,
  Chip,
  ConfirmDialog,
  Toolbar,
  SidebarFilters,
  DatePicker,
  SearchFilterPanel,
  NavBar,
  Box,
  Flex,
  Heading,
  Label,
  Stack,
  Text,
];

// Default экспорт как Vue плагин
export const NestroUI = {
  install(app: App) {
    components.forEach((c) => {
      if (c.name) {
        app.component(c.name, c);
      }
    });
  },
};

export default NestroUI;
