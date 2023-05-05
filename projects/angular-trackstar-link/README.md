# angular-trackstar-link

### This package provides:

An [Angular](https://angular.io/) button component that launches the [Trackstar](https://www.trackstarhq.com/) connect modal

### Installing:

_npm_:

```bash
npm install @trackstar/angular-trackstar-link
```

_yarn_:

```bash
yarn add @trackstar/angular-trackstar-link
```

### Usage

The `trackstar-link` modal can be triggered using the `trackstar-connect-button` component.

```html
<trackstar-connect-button
  [config]="myConfig"
  [buttonText]="Connect your WMS"
></trackstar-connect-button>
```

```jsx
export class AppComponent {
  someCustomerId = '12345';
  myConfig = {
    onSuccess: async (authCode: string) => {
      await fetch('https://my-company/store-token', {
        method: 'POST',
        body: JSON.stringify({
          customer_id: this.someCustomerId,
          authCode: authCode
        }),
      });
    },
    onClose: () => {
      console.log('closed');
    },
    onLoad: () => {
      console.log('loaded');
    },
    getLinkToken: async () => {
      const res = await fetch('https://my-company/link-token', {
        method: 'POST',
      });
      const {linkToken} = await res.json();
      return linkToken;
    }
  };
}
```

Use optional `integrationAllowList` and `integrationBlockList` fields to determine the specific integrations to display. Both fields take an string array of integration names.
To only show ShipBob and Ongoing integrations use
```html
integrationAllowList:{['shipbob', 'ongoing']}
```
To show all integrations *except* ShipBob and Ongoing use
```html
integrationBlockList:{['shipbob', 'ongoing']}
```
The `integrationAllowList` and `integrationBlockList` fields are mutually exclusive. If both fields are given values, all integrations will be displayed.
Integration strings that can be used in these fields are:
- extensiv-3pl-central
- fba
- infoplus
- ongoing
- shipbob
- shiphero
- shipstream
- skusavvy
- skuvault

### Issues/Questions
Contact us at `support@trackstarhq.com`.