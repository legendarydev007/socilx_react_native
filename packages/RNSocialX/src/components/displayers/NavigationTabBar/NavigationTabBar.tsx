import {ActionSheet} from 'native-base';
import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {LayoutEvent, NavigationScreenProp} from 'react-navigation';

import {connect} from 'react-redux';
import {ITranslatedProps} from '../../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	PickerImage,
	PickerImageMultiple,
} from '../../../utilities';
import {NavigationItems} from './';
import styles from './NavigationTabBar.style';

const INITIAL_SCREEN = 'UserFeedTab';

////////////////////////////////////////////////////////////////
// These types will be moved once Redux is up and running
////////////////////////////////////////////////////////////////
export interface INavigationState {
	tabBarHeight: number;
	newNotifications: number;
}

////////////////////////////////////////////////////////////////
// This action type will be moved once Redux is up and running
////////////////////////////////////////////////////////////////
const UPDATE_TAB_BAR_HEIGHT = 'update_tab_bar_height';

////////////////////////////////////////////////////////////////
// This action will be moved once Redux is up and running
////////////////////////////////////////////////////////////////
const updateTabBarHeight = (height: number) => {
	return {
		type: UPDATE_TAB_BAR_HEIGHT,
		payload: height,
	};
};

interface ITabBarBottomState {
	selectedTab: string;
	changeInProgress: boolean;
}

interface ITabBarBottomProps extends INavigationState, ITranslatedProps {
	navigation: NavigationScreenProp<any>;
	updateTabBarHeight: (value: number) => void;
	tabHeight: number;
	notifications: any;
}

class NavigationTabBarComponent extends React.Component<ITabBarBottomProps, ITabBarBottomState> {
	public state = {
		selectedTab: INITIAL_SCREEN,
		changeInProgress: false,
	};

	public render() {
		return (
			<SafeAreaView style={styles.container} onLayout={this.layoutHandler}>
				<NavigationItems
					notifications={this.props.notifications}
					selectedTab={this.state.selectedTab}
					showPhotoOptionsMenu={this.showPhotoOptionsMenu}
					tabChange={this.tabChangeHandler}
				/>
			</SafeAreaView>
		);
	}

	private layoutHandler = (event: LayoutEvent) => {
		const viewHeight = event.nativeEvent.layout.height;
		this.props.updateTabBarHeight(viewHeight);
	};

	private tabChangeHandler = (screenName: string) => {
		if (this.state.selectedTab !== screenName && !this.state.changeInProgress) {
			const navSuccess = this.props.navigation.navigate(screenName);
			if (navSuccess) {
				this.setState({
					changeInProgress: true,
					selectedTab: screenName,
				});

				// no better solution here... just disable fast tab switching while sliding in progress
				setTimeout(() => {
					this.setState({
						changeInProgress: false,
					});
				}, 200);
			}
		}
	};

	private showPhotoOptionsMenu = () => {
		const {getText, navigation} = this.props;
		ActionSheet.show(
			{
				options: [
					getText('tab.bar.bottom.photo.picker.use.gallery'),
					getText('tab.bar.bottom.photo.picker.take.use.camera'),
					getText('button.CANCEL'),
				],
				cancelButtonIndex: 2,
				title: getText('tab.bar.bottom.photo.picker.title'),
			},
			async (buttonIndex: number) => {
				let selectedMediaObjects: PickerImageMultiple = [];
				if (buttonIndex === 0) {
					selectedMediaObjects = await getGalleryMediaObjectMultiple();
				} else if (buttonIndex === 1) {
					selectedMediaObjects = await getCameraMediaObjectMultiple();
				}

				console.log('selectedMediaObjects', selectedMediaObjects);
				if (selectedMediaObjects.length > 0) {
					const optimizedMediaObjects = await Promise.all(
						selectedMediaObjects.map(async (mediaObject: PickerImage) => getOptimizedMediaObject(mediaObject)),
					);
					navigation.navigate('PhotoScreen', {mediaObjects: optimizedMediaObjects});
				}
			},
		);
	};
}

const mapStateToProps = (state: any) => ({
	tabHeight: state.navigation.tabBarHeight,
});

export const NavigationTabBar = connect(
	mapStateToProps,
	{updateTabBarHeight},
)(NavigationTabBarComponent);
