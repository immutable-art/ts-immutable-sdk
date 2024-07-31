import {
  WidgetEvent,
  CheckoutEventType,
  IMTBLWidgetEvents,
  WidgetType,
} from '@imtbl/checkout-sdk';

export const sendCheckoutReadyEvent = (eventTarget: Window | EventTarget) => {
  const event = new CustomEvent<
  WidgetEvent<WidgetType.CHECKOUT, CheckoutEventType.CHECKOUT_APP_READY>
  >(IMTBLWidgetEvents.IMTBL_CHECKOUT_WIDGET_EVENT, {
    detail: {
      type: CheckoutEventType.CHECKOUT_APP_READY,
      data: {},
    },
  });
  // eslint-disable-next-line no-console
  console.log('checkout app ready ', eventTarget, event);
  if (eventTarget !== undefined) eventTarget.dispatchEvent(event);
};

export const sendCheckoutEvent = (
  eventTarget: Window | EventTarget,
  data: Record<string, unknown>,
) => {
  const event = new CustomEvent<
  WidgetEvent<WidgetType.CHECKOUT, CheckoutEventType.CHECKOUT_APP_EVENT>
  >(IMTBLWidgetEvents.IMTBL_CHECKOUT_WIDGET_EVENT, {
    detail: {
      type: CheckoutEventType.CHECKOUT_APP_EVENT,
      data,
    },
  });
  // eslint-disable-next-line no-console
  console.log('checkout app event ', eventTarget, event);
  if (eventTarget !== undefined) eventTarget.dispatchEvent(event);
};