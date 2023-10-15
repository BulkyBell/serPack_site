import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  DxButtonGroupModule,
  DxButtonModule,
  DxCalendarModule,
  DxChartModule,
  DxCheckBoxModule,
  DxColorBoxModule,
  DxContextMenuModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDrawerModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxFormModule,
  DxHtmlEditorModule,
  DxListModule,
  DxLoadIndicatorModule,
  DxMenuModule,
  DxNumberBoxModule,
  DxPivotGridModule,
  DxPopoverModule,
  DxPopupModule,
  DxRadioGroupModule,
  DxSchedulerModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxSortableModule,
  DxSwitchModule,
  DxTabPanelModule,
  DxTabsModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxTooltipModule,
  DxTreeListModule,
  DxTreeViewModule,
  DxValidationGroupModule,
  DxValidationSummaryModule,
  DxValidatorModule,
} from 'devextreme-angular';

import { IsNullPipe, NotIsNullPipe, TruncatePipe } from './pipes';

// Componentes visibles en todos los módulos.
const components = [
 
];

// Componentes que sólo se usan en este módulo y que no tiene sentido exportar porque solos no se van a usar.
const privateComponents = [

];

const pipes = [NotIsNullPipe, IsNullPipe, TruncatePipe];

export const dxModules = [
  DxValidationGroupModule,
  DxValidatorModule,
  DxTreeViewModule,
  DxListModule,
  DxTextBoxModule,
  DxDateBoxModule,
  DxButtonModule,
  DxButtonGroupModule,
  DxDropDownBoxModule,
  DxLoadIndicatorModule,
  DxToolbarModule,
  DxDrawerModule,
  DxScrollViewModule,
  DxContextMenuModule,
  DxPopupModule,
  DxDataGridModule,
  DxRadioGroupModule,
  DxNumberBoxModule,
  DxCheckBoxModule,
  DxColorBoxModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxDropDownButtonModule,
  DxHtmlEditorModule,
  DxTabsModule,
  DxTabPanelModule,
  DxPopoverModule,
  DxFormModule,
  DxSwitchModule,
  DxChartModule,
  DxValidationSummaryModule,
  DxSchedulerModule,
  DxCalendarModule,
  DxSortableModule,
  DxTreeListModule,
  DxMenuModule,
  DxPivotGridModule,
  DxTooltipModule,
];

@NgModule({
  imports: [
    CommonModule,
     RouterModule, 
     FormsModule,
     ReactiveFormsModule, 
     dxModules],
  declarations: [//components, 
    //privateComponents, 
    pipes],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    dxModules,
    components,
    pipes,

  ],
})

export class SharedModule {}
