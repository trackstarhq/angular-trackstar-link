import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface ClientConfig {
  onSuccess: (authCode: string) => void;
  onClose?: () => void;
  onLoad?: () => void;
  getLinkToken: () => Promise<string>;
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

  constructor() {}

  ngOnInit(): void {
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
    if (!window.Trackstar) {
      console.error('Trackstar is not initialized');
      return;
    }
    if (!window.Trackstar.state?.isLoaded) {
      console.error('Trackstar has not been loaded, did you call Trackstar.init()?');
      return;
    }
    // Open modal
    window.Trackstar.open({ integrationId: undefined });
  }

  handleClick() {
    this.onClick.emit();
    this.open();
  }
}
