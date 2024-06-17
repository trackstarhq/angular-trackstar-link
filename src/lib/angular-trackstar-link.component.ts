import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

type AllowedEndpoints = "get_inventory" | "get_products" | "create_product" | "update_product" | "get_inbound_shipment" | "create_inbound_shipment"
  | "update_inbound_shipment" | "get_orders" | "create_order" | "update_order" | "create_kit" | "update_kit" | "get_returns" | "create_return" | "update_return"
  | "get_shipping_methods" | "get_bills" | "get_warehouses" | "get_warehouse_customers" | "get_labor_activities";
  
interface ClientConfig {
  onSuccess: (authCode: string) => void;
  onClose?: () => void;
  onLoad?: () => void;
  getLinkToken: () => Promise<string>;
  integrationAllowList?: string[];
  integrationBlockList?: string[];
  integrationsWithEndpoints?: AllowedEndpoints[];
  buttonId?: string;
  sandbox?: boolean;
}

declare global {
  interface Window {
    Trackstar: any;
  }
}

@Component({
  selector: 'trackstar-connect-button',
  templateUrl: './angular-trackstar-link.component.html',
  styleUrls: ['./angular-trackstar-link.component.scss']
})
export class TrackstarConnectButtonComponent implements OnInit {
  @Input() config: ClientConfig;
  @Input() buttonText: string = 'Connect WMS';
  @Input() buttonStyle: any;
  @Input() buttonClass: string;

  @Output() onClick = new EventEmitter<void>();

  error: any;
  loading: boolean = true;
  trackstarModalId: string;

  constructor() {}

  ngOnInit(): void {
    this.trackstarModalId = this.config.hasOwnProperty("buttonId") ? "Trackstar" + this.config.buttonId : "Trackstar";
    this.loadScript('https://link.trackstarhq.com/main.js').then(() => {
      this.loading = false;
      if (window.Trackstar) {
        window.Trackstar.init({
          ...this.config,
          onLoad: () => {
            this.config.onLoad && this.config.onLoad();
          },
          onClose: () => this.config.onClose && this.config.onClose(),
          getLinkToken: () => this.config.getLinkToken && this.config.getLinkToken(),
        });
      }
    }).catch(err => {
      this.loading = false;
      this.error = err;
    });
  }

  loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => setTimeout(() => {resolve()});
      script.onerror = () => reject(`Error loading script: ${src}`);
      document.body.appendChild(script);
    });
  }

  open() {
    if (this.error) {
      throw new Error(`Error loading Trackstar script: ${this.error}`);
    }
    if (!window[this.trackstarModalId]) {
      console.error('Trackstar is not initialized');
      return;
    }
    if (!window[this.trackstarModalId].state?.isLoaded) {
      console.error('Trackstar has not been loaded, did you call Trackstar.init()?');
      return;
    }
    // Open modal
    window[this.trackstarModalId].open({ integrationId: undefined });
  }

  handleClick() {
    this.onClick.emit();
    this.open();
  }
}
