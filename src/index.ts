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
import BridgeModal from './components/BridgeModal/BridgeModal.vue';

export { openBridgeModal } from './components/BridgeModal/BridgeModalService';
export type {
  BridgeModalOptions,
  BridgeModalHandle,
  BridgeMessage,
} from './components/BridgeModal/BridgeModal.types';
import SearchFilterPanel from './components/SearchFilterPanel/SearchFilterPanel.vue';
import NavBar from './components/NavBar/NavBar.vue';
import Card from './components/Card/Card.vue';
import Textarea from './components/Textarea/Textarea.vue';
import FileUpload from './components/FileUpload/FileUpload.vue';
import Notification from './components/Notification/Notification.vue';
import SectionWrapper from './components/SectionWrapper/SectionWrapper.vue';
import MultiSelect from './components/MultiSelect/MultiSelect.vue';

// Примитивные компоненты
import Box from './components/primitives/Box/Box.vue';
import Field from './components/primitives/Field/Field.vue';
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
  BridgeModal,
  SearchFilterPanel,
  NavBar,
  Card,
  Textarea,
  FileUpload,
  Notification,
  SectionWrapper,
  MultiSelect,
  Box,
  Field,
  Flex,
  Heading,
  Label,
  Stack,
  Text,
};

// Экспорт типов
export type { BaseFieldProps } from './types/form';
export type { NFieldProps } from './components/primitives/Field/Field.types';
export type {
  FilterGroup,
  FilterGroupItem,
  FilterGroupSavePayload,
  FilterGroupCreatePayload,
  FilterType,
  FilterValue,
  FilterConfigOption,
} from './components/SearchFilterPanel/SearchFilterPanel.types';

// Экспорт composables
export { useForm } from './composables/useForm';

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
  BridgeModal,
  SearchFilterPanel,
  NavBar,
  Card,
  Textarea,
  FileUpload,
  Notification,
  SectionWrapper,
  MultiSelect,
  Box,
  Field,
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
