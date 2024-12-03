import {
  AllDualVariantIconKeys,
  MenuItem,
  Stack,
  Sticker,
} from '@biom3/react';
import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';

import { Checkout } from '@imtbl/checkout-sdk';
import { useTranslation } from 'react-i18next';
import { getRouteAndTokenBalances } from '../../../lib/squid/functions/getRouteAndTokenBalances';
import { getRemoteVideo } from '../../../lib/utils';
import { Chain, RouteData } from '../../../lib/squid/types';

export interface SelectedRouteOptionProps {
  checkout: Checkout;
  routeData?: RouteData;
  chains: Chain[] | null;
  onClick: MouseEventHandler<HTMLSpanElement>;
  loading?: boolean;
  withSelectedWallet?: boolean;
  insufficientBalance?: boolean;
  showOnrampOption?: boolean;
}

function SelectedRouteOptionContainer({
  children,
  onClick,
  selected,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="base.spacing.x4"
      sx={{
        ml: ({ base }) => (selected
          ? `calc(${base.spacing.x12} * -1)`
          : `calc(${base.spacing.x16} * -1)`),
        w: ({ base }) => (selected
          ? `calc(100% + (${base.spacing.x12}))`
          : `calc(100% + (${base.spacing.x16}))`),
      }}
      rc={<span {...(onClick ? { onClick } : {})} />}
    >
      {children}
    </Stack>
  );
}

export function SelectedRouteOption({
  checkout,
  routeData,
  chains,
  loading = false,
  withSelectedWallet = false,
  insufficientBalance = false,
  showOnrampOption = false,
  onClick,
}: SelectedRouteOptionProps) {
  const { t } = useTranslation();

  const { fromToken } = routeData?.amountData ?? {};
  const chain = chains?.find((c) => c.id === fromToken?.chainId);

  const { routeBalanceUsd, fromAmount, fromAmountUsd } = useMemo(
    () => getRouteAndTokenBalances(routeData),
    [routeData],
  );

  const insufficientBalancePayWithCard = insufficientBalance && showOnrampOption;

  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();

      if (!loading && !routeData && !insufficientBalancePayWithCard) return false;

      onClick?.(event);
      return true;
    },
    [onClick, loading, routeData],
  );

  if (!routeData && loading) {
    return (
      <SelectedRouteOptionContainer
        onClick={handleOnClick}
        selected={withSelectedWallet}
      >
        <MenuItem.FramedVideo
          videoUrl={getRemoteVideo(
            checkout.config.environment,
            '/loading_bubble-small.mp4',
          )}
          padded
          mimeType="video/mp4"
          circularFrame
        />
        <MenuItem.Caption>{t('views.ADD_TOKENS.routeSelection.loadingText')}</MenuItem.Caption>
      </SelectedRouteOptionContainer>
    );
  }

  if ((!routeData && !loading) || insufficientBalance) {
    let icon: AllDualVariantIconKeys = 'Sparkle';
    let copy = '';

    if (insufficientBalance) {
      icon = 'InformationCircle';
      copy = t('views.ADD_TOKENS.routeSelection.noRoute');
    }

    if (insufficientBalancePayWithCard) {
      icon = 'BankCard';
      copy = t('views.ADD_TOKENS.routeSelection.payWithCard');
    }

    return (
      <SelectedRouteOptionContainer
        onClick={handleOnClick}
        selected={withSelectedWallet}
      >
        <MenuItem.FramedIcon
          icon={icon}
          variant="bold"
          circularFrame
          emphasized={false}
        />
        <MenuItem.Caption>{copy}</MenuItem.Caption>
      </SelectedRouteOptionContainer>
    );
  }

  return (
    <SelectedRouteOptionContainer
      onClick={handleOnClick}
      selected={withSelectedWallet}
    >
      {chain && (
        <Sticker position={{ x: 'right', y: 'bottom' }}>
          <Sticker.FramedImage
            use={<img src={chain.iconUrl} alt={chain.name} />}
            size="xSmall"
            sx={{ bottom: 'base.spacing.x2', right: 'base.spacing.x2' }}
          />

          <MenuItem.FramedImage
            circularFrame
            padded
            use={<img src={fromToken?.iconUrl} alt={fromToken?.name} />}
          />
        </Sticker>
      )}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ w: '100%' }}
      >
        <Stack gap="0px">
          <MenuItem.Label>{fromToken?.name}</MenuItem.Label>
          <MenuItem.Caption>
            {`${t('views.ADD_TOKENS.fees.balance')} ${t(
              'views.ADD_TOKENS.fees.fiatPricePrefix',
            )} $${routeBalanceUsd}`}
          </MenuItem.Caption>
        </Stack>
        <MenuItem.PriceDisplay price={fromAmount}>
          <MenuItem.PriceDisplay.Caption>
            {`${t('views.ADD_TOKENS.fees.fiatPricePrefix')} $${fromAmountUsd}`}
          </MenuItem.PriceDisplay.Caption>
        </MenuItem.PriceDisplay>
      </Stack>
    </SelectedRouteOptionContainer>
  );
}
