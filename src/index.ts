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
import Modal from './components/Modal/Modal.vue';
import ProgressBar from './components/ProgressBar/ProgressBar.vue';
import WorkPlace from './components/WorkPlace/WorkPlace.vue';
import RadioButton from './components/RadioButton/RadioButton.vue';
import RadioGroup from './components/RadioGroup/RadioGroup.vue';
import RangeSlider from './components/RangeSlider/RangeSlider.vue';
import SegmentedControl from './components/SegmentedControl/SegmentedControl.vue';
import Switch from './components/Switch/Switch.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs.vue';
import SidebarFilters from './components/SidebarFilters/SidebarFilters.vue';
import DatePicker from './components/DatePicker/DatePicker.vue';
import SpeedDial from './components/SpeedDial/SpeedDial.vue';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog.vue';
import Toolbar from './components/Toolbar/Toolbar.vue';
import Chip from './components/Chip/Chip.vue';
import SearchFilterPanel from './components/SearchFilterPanel/SearchFilterPanel.vue';
import NavBar from './components/NavBar/NavBar.vue';

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
  Modal,
  ProgressBar,
  WorkPlace,
  RadioButton,
  RadioGroup,
  RangeSlider,
  SegmentedControl,
  Switch,
  Tooltip,
  Breadcrumbs,
  SpeedDial,
  Chip,
  ConfirmDialog,
  Toolbar,
  SidebarFilters,
  DatePicker,
  SearchFilterPanel,
  NavBar,
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
  Modal,
  ProgressBar,
  WorkPlace,
  RadioButton,
  RadioGroup,
  RangeSlider,
  SegmentedControl,
  Switch,
  Tooltip,
  Breadcrumbs,
  SpeedDial,
  Chip,
  ConfirmDialog,
  Toolbar,
  SidebarFilters,
  DatePicker,
  SearchFilterPanel,
  NavBar,
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
