import {
  ChainId,
  Checkout,
  IMTBLWidgetEvents,
  TokenFilterTypes,
  TokenInfo,
} from '@imtbl/checkout-sdk';
import {
  Body, Box, MenuItem, OverflowPopoverMenu,
} from '@biom3/react';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { SimpleLayout } from '../../../components/SimpleLayout/SimpleLayout';
import { HeaderNavigation } from '../../../components/Header/HeaderNavigation';
import { amountInputValidation } from '../../../lib/validations/amountInputValidations';
import { TextInputForm } from '../../../components/FormComponents/TextInputForm/TextInputForm';
import { OptionsDrawer } from '../components/OptionsDrawer';
import { EventTargetContext } from '../../../context/event-target-context/EventTargetContext';
import { orchestrationEvents } from '../../../lib/orchestrationEvents';
import { AddFundsActions, AddFundsContext } from '../context/AddFundsContext';
import { getL2ChainId } from '../../../lib';
import {
  SharedViews,
  ViewActions,
  ViewContext,
} from '../../../context/view-context/ViewContext';
import { useRoutes } from '../hooks/useRoutes';

interface AddFundsProps {
  checkout?: Checkout;
  showBackButton?: boolean;
  showOnrampOption?: boolean;
  showSwapOption?: boolean;
  showBridgeOption?: boolean;
  toTokenAddress?: string;
  toAmount?: string;
  onCloseButtonClick?: () => void;
  onBackButtonClick?: () => void;
}

export function AddFunds({
  checkout,
  toAmount,
  toTokenAddress,
  showBackButton = false,
  showOnrampOption = true,
  showSwapOption = true,
  showBridgeOption = true,
  onBackButtonClick,
  onCloseButtonClick,
}: AddFundsProps) {
  const showBack = showBackButton || !!onBackButtonClick;

  const { addFundsState, addFundsDispatch } = useContext(AddFundsContext);

  const { viewDispatch } = useContext(ViewContext);

  const { routes, fetchRoutesWithRateLimit } = useRoutes();

  const {
    eventTargetState: { eventTarget },
  } = useContext(EventTargetContext);

  const [showOptionsDrawer, setShowOptionsDrawer] = useState(false);
  const [onRampAllowedTokens, setOnRampAllowedTokens] = useState<TokenInfo[]>(
    [],
  );
  const [allowedTokens, setAllowedTokens] = useState<TokenInfo[]>([]);
  const [currentToAmount, setCurrentToAmount] = useState<string>(
    toAmount || '0',
  );
  const [currentToTokenAddress, setCurrentToTokenAddress] = useState<
  TokenInfo | undefined
  >();

  const showErrorView = useCallback(
    (error: Error) => {
      viewDispatch({
        payload: {
          type: ViewActions.UPDATE_VIEW,
          view: {
            type: SharedViews.ERROR_VIEW,
            error,
          },
        },
      });
    },
    [viewDispatch],
  );

  useEffect(() => {
    if (!checkout) {
      showErrorView(new Error('Checkout object is missing'));
      return;
    }

    const fetchTokens = async () => {
      try {
        const tokenResponse = await checkout.getTokenAllowList({
          type: TokenFilterTypes.SWAP,
          chainId: getL2ChainId(checkout.config),
        });

        if (tokenResponse?.tokens.length > 0) {
          setAllowedTokens(tokenResponse.tokens);

          const token = tokenResponse.tokens.find((t) => t.address === toTokenAddress)
            || tokenResponse.tokens[0];
          setCurrentToTokenAddress(token);

          addFundsDispatch({
            payload: {
              type: AddFundsActions.SET_ALLOWED_TOKENS,
              allowedTokens: tokenResponse.tokens,
            },
          });
        }
      } catch (error) {
        showErrorView(new Error('Failed to fetch tokens'));
      }
    };

    fetchTokens();
  }, [checkout, toTokenAddress]);

  useEffect(() => {
    if (!checkout) {
      showErrorView(new Error('Checkout object is missing'));
      return;
    }

    const fetchOnRampTokens = async () => {
      try {
        const tokenResponse = await checkout.getTokenAllowList({
          type: TokenFilterTypes.ONRAMP,
          chainId: getL2ChainId(checkout.config),
        });

        if (tokenResponse?.tokens.length > 0) {
          setOnRampAllowedTokens(tokenResponse.tokens);
        }
      } catch (error) {
        showErrorView(new Error('Failed to fetch onramp tokens'));
      }
    };
    fetchOnRampTokens();
  }, [checkout]);

  const openDrawer = async () => {
    if (!addFundsState.squid || !currentToTokenAddress) {
      return;
    }
    await fetchRoutesWithRateLimit(
      addFundsState.squid,
      addFundsState.balances,
      ChainId.IMTBL_ZKEVM_MAINNET.toString(),
      currentToTokenAddress?.address ?? '',
      currentToAmount,
      5,
      1000,
    );

    setShowOptionsDrawer(true);
  };

  const updateAmount = (value: string) => {
    setCurrentToAmount(value);
  };

  const isSelected = (token: TokenInfo) => token.address === currentToTokenAddress;

  const isDisabled = !currentToTokenAddress || !currentToAmount || parseFloat(currentToAmount) <= 0;

  const handleTokenChange = (token: TokenInfo) => {
    setCurrentToTokenAddress(token);
  };

  // const handleReviewClick = () => {
  //   console.log('handle review click');
  // };

  const onPayWithCard = () => {
    const data = {
      tokenAddress: currentToTokenAddress?.address ?? '',
      amount: toAmount ?? '',
    };
    orchestrationEvents.sendRequestOnrampEvent(
      eventTarget,
      IMTBLWidgetEvents.IMTBL_ADD_FUNDS_WIDGET_EVENT,
      data,
    );
  };

  const checkShowOnRampOption = () => {
    if (showOnrampOption && currentToTokenAddress) {
      const token = onRampAllowedTokens.find(
        (t) => t.address?.toLowerCase()
          === currentToTokenAddress.address?.toLowerCase(),
      );
      return !!token;
    }
    return false;
  };

  return (
    <SimpleLayout
      header={(
        <HeaderNavigation
          title="Add"
          onCloseButtonClick={onCloseButtonClick}
          showBack={showBack}
          onBackButtonClick={() => {
            orchestrationEvents.sendRequestGoBackEvent(
              eventTarget,
              IMTBLWidgetEvents.IMTBL_ADD_FUNDS_WIDGET_EVENT,
              {},
            );
            onBackButtonClick?.();
          }}
        />
      )}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'base.spacing.x10',
          }}
        >
          <Box sx={{ width: 'base.spacing.x40' }}>
            <Box sx={{ marginBottom: 'base.spacing.x3' }}>
              <TextInputForm
                testId="add-funds-amount"
                type="number"
                value={currentToAmount}
                validator={amountInputValidation}
                onTextInputChange={(value) => updateAmount(value)}
                textAlign="right"
                inputMode="decimal"
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                borderRadius: 'base.borderRadius.x20',
                alignItems: 'center',
                gap: 'base.spacing.x5',
                justifyContent: 'center',
                border: '1px solid grey',
              }}
            >
              <Body size="large" weight="bold">
                {currentToTokenAddress?.name ?? ''}
              </Body>
              <OverflowPopoverMenu testId="add-funds-tokens-menu">
                {allowedTokens.map((token: any) => (
                  <MenuItem
                    key={token.address}
                    onClick={() => handleTokenChange(token)}
                    selected={isSelected(token)}
                  >
                    <MenuItem.Label>{token.name}</MenuItem.Label>
                  </MenuItem>
                ))}
              </OverflowPopoverMenu>
            </Box>
          </Box>
        </Box>

        <MenuItem
          size="small"
          emphasized
          disabled={isDisabled}
          sx={{
            opacity: isDisabled ? 0.5 : 1,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
          }}
          onClick={() => {
            openDrawer();
          }}
        >
          <MenuItem.IntentIcon icon="ChevronExpand" />
          <MenuItem.Label size="medium">Choose payment option</MenuItem.Label>
        </MenuItem>
        <Box
          sx={{
            marginBottom: 'base.spacing.x10',
          }}
        >
          <OptionsDrawer
            routes={routes}
            showOnrampOption={checkShowOnRampOption()}
            showSwapOption={showSwapOption}
            showBridgeOption={showBridgeOption}
            visible={showOptionsDrawer}
            onClose={() => setShowOptionsDrawer(false)}
            onPayWithCard={onPayWithCard}
          />
        </Box>
        {/* <Button
          testId="add-funds-button"
          variant="primary"
          onClick={handleReviewClick}
          size="large"
          sx={{
            marginBottom: 'base.spacing.x10',
            mx: 'base.spacing.x3',
          }}
        >
          Review
        </Button> */}
      </Box>
    </SimpleLayout>
  );
}
