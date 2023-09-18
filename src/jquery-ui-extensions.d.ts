// jquery-ui-extensions.d.ts
import 'jquery-ui/ui/widgets/draggable';

// Extend the JQuery interface with the draggable function
declare interface JQuery {
  draggable(options?: any): any;
}
