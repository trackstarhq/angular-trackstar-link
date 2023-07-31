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

### Optional Props

Use optional `integrationAllowList` and `integrationBlockList` props to determine the specific integrations to display. Both props take an string array of integration names.
To only show ShipBob and Ongoing integrations use
```jsx
integrationAllowList={['shipbob', 'ongoing']}
```
To show all integrations *except* ShipBob and Ongoing use
```jsx
integrationBlockList={['shipbob', 'ongoing']}
```
The `integrationAllowList` and `integrationBlockList` props are mutually exclusive. If both props are given values, all integrations will be displayed.
Integration IDs that can be used in these props can be found in the table here: https://docs.trackstarhq.com/introduction#warehouse-management-systems

Set the `sandbox` prop to `true` to include a sandbox WMS in the list of integrations. This is useful for testing.

Use the `buttonId` prop to use multiple instances of `<TrackstarConnectButton>`. This is useful to have several buttons with different `integrationAllowList`'s to display. Each `<TrackstarConnectButton>` will need its own unique string for `buttonId`.

### Issues/Questions
Contact us at `support@trackstarhq.com`.
