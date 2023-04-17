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

### Issues/Questions
Contact us at `support@trackstarhq.com`.