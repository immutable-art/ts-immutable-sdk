import { AppHeaderBar, ButtCon } from '@biom3/react';
import { useContext } from 'react';
import { ViewActions, ViewContext } from '../../context/ViewContext';
import { HeaderNavigationStyles } from './HeaderStyles';
import { sendCloseWidgetEvent } from '../../widgets/connect/ConnectWidgetEvents';
import { sendWalletWidgetCloseEvent } from '../../widgets/wallet/WalletWidgetEvents';

export interface HeaderNavigationProps {
  title?: string;
  showBack?: boolean;
  showClose?: boolean;
  showSettings?: boolean;
  transparent?: boolean;
  onSettingsClick?: () => void;
  onBackButtonClick?: () => void;
}

export const HeaderNavigation = ({
  title,
  showBack = false,
  showClose = false,
  showSettings = false,
  transparent = true,
  onSettingsClick,
  onBackButtonClick,
}: HeaderNavigationProps) => {
  const { viewDispatch } = useContext(ViewContext);

  const goBack = async () => {
    viewDispatch({
      payload: {
        type: ViewActions.GO_BACK,
      },
    });
  };

  const close = () => {
    //todo: need a reference to specific widget to call specific Close-Widget event
    sendCloseWidgetEvent();

    // this one if for the wallet widget close
    sendWalletWidgetCloseEvent();
  };

  const handleBackButtonClick = () => {
    onBackButtonClick ? onBackButtonClick() : goBack();
  };

  return (
    <AppHeaderBar
      testId="header-navigation-container"
      sx={HeaderNavigationStyles(transparent)}
      contentAlign="left"
    >
      {showBack && (
        <AppHeaderBar.LeftButtCon
          icon="ArrowBackward"
          iconVariant="bold"
          onClick={handleBackButtonClick}
          testId="back-button"
        />
      )}
      <AppHeaderBar.Title testId="header-title" size="medium">
        {title}
      </AppHeaderBar.Title>
      <AppHeaderBar.RightHandButtons>
        {showSettings && onSettingsClick && (
          <ButtCon
            icon="SettingsCog"
            iconVariant="bold"
            onClick={onSettingsClick}
            testId="settings-button"
          />
        )}
        {showClose && (
          <ButtCon
            iconVariant="bold"
            icon="Close"
            onClick={close}
            testId="close-button"
          />
        )}
      </AppHeaderBar.RightHandButtons>
    </AppHeaderBar>
  );
};
