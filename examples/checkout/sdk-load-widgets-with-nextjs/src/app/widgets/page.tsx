"use client";
import { Box } from '@biom3/react';
import { checkout } from '@imtbl/sdk';
import { CheckoutFlowType, Widget, WidgetType } from '@imtbl/sdk/checkout';
import { useEffect, useState } from 'react';

const checkoutSDK = new checkout.Checkout();

function Widgets() {

  const [widget, setWidget] = useState<Widget<WidgetType.CHECKOUT>>();

  useEffect(() => {

    const loadWidgets = async () => {
      const widgetsFactory = await checkoutSDK.widgets({ config: {} });

      const widget = widgetsFactory.create(WidgetType.CHECKOUT, {})
      setWidget(widget);
    }

    loadWidgets();
  }, []);


  useEffect(() => {
    if (widget) {
      widget.mount("widget-root", {
        flow: CheckoutFlowType.WALLET,
      });
    }
  }, [widget]);


  return (
    <div>
      <Box
        id="widget-root"
        sx={{
          minw: "430px",
          minh: "650px",
          bg: "base.color.translucent.standard.300",
          brad: "base.borderRadius.x5",
        }}
      />
    </div>
  )
}

export default Widgets;
