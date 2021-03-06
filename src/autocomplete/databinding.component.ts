/**
 * AutoComplete Remote-Data & Local-Data Samples
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { AutoCompleteComponent } from '@syncfusion/ej2-ng-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-ng-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'databinding.html',
    styleUrls: ['databinding.css'],
    encapsulation: ViewEncapsulation.None
})
export class DataBindingAutoCompleteComponent {
    @ViewChild('local')
    public localObj: AutoCompleteComponent;
    @ViewChild('remote')
    public remoteObj: AutoCompleteComponent;
    @ViewChild('checkbox')
    public checkboxObj: CheckBoxComponent;
    public countries: { [key: string]: Object; }[] = [
        { Name: 'Australia', Code: 'AU' },
        { Name: 'Bermuda', Code: 'BM' },
        { Name: 'Canada', Code: 'CA' },
        { Name: 'Cameroon', Code: 'CM' },
        { Name: 'Denmark', Code: 'DK' },
        { Name: 'France', Code: 'FR' },
        { Name: 'Finland', Code: 'FI' },
        { Name: 'Germany', Code: 'DE' },
        { Name: 'Greenland', Code: 'GL' },
        { Name: 'Hong Kong', Code: 'HK' },
        { Name: 'India', Code: 'IN' },
        { Name: 'Italy', Code: 'IT' },
        { Name: 'Japan', Code: 'JP' },
        { Name: 'Mexico', Code: 'MX' },
        { Name: 'Norway', Code: 'NO' },
        { Name: 'Poland', Code: 'PL' },
        { Name: 'Switzerland', Code: 'CH' },
        { Name: 'United Kingdom', Code: 'GB' },
        { Name: 'United States', Code: 'US' }
    ];
    // maps the local data column to fields property
    public localFields: Object = { value: 'Name' };
    //set the placeholder to AutoComplete input
    public localWaterMark: string = 'e.g. Australia';
    //bind the DataManager instance to dataSource property
    public data: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Products',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    // set the count for displays the suggestion items.
    public suggestionCount: number = 5;
    public query: Query = new Query().select(['ProductID', 'ProductName']);
    // maps the remote data column to fields property
    public remoteFields: Object = { value: 'ProductName' };
    //set the placeholder to AutoComplete input
    public remoteWaterMark: string = 'e.g. Alice Mutton';
    // bind change event
    public onChange(): void {
        // enable or disable the autofill in remote data AutoComplete based on CheckBox checked state
        this.localObj.autofill = this.checkboxObj.checked;
        // enable or disable the autofill in local data AutoComplete based on CheckBox checked state
        this.remoteObj.autofill = this.checkboxObj.checked;
    }
}
