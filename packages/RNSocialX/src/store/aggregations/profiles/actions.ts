import { IFindFriendsSuggestionsInput, IFriendData } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import {
	ActionTypes,
	IFindFriendsSuggestionsAction,
	IFriendSuggestionData,
	IResetFindFriendsSuggestionsAction,
	IResetSearchProfilesByFullNameAction,
	ISearchProfilesByFullNameAction,
	ISyncFindFriendsSuggestionsAction,
	ISyncResetFindFriendsSuggestionsAction,
	ISyncResetSearchProfilesByFullNameAction,
	ISyncSearchProfilesByFullNameAction,
} from './Types';

export const searchProfilesByFullNameAction: ActionCreator<ISearchProfilesByFullNameAction> = (
	searchProfilesByFullNameInput: any,
) => ({
	type: ActionTypes.SEARCH_PROFILES_BY_FULLNAME,
	payload: searchProfilesByFullNameInput,
});

export const syncSearchProfilesByFullNameAction: ActionCreator<
	ISyncSearchProfilesByFullNameAction
> = (profiles: IFriendData[]) => ({
	type: ActionTypes.SYNC_SEARCH_PROFILES_BY_FULLNAME,
	payload: profiles,
});

export const searchProfilesByFullName = ({
	term,
	maxResults,
}: {
	term: string;
	maxResults?: number;
}): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();

	if (term.length > 0) {
		try {
			dispatch(searchProfilesByFullNameAction({ term, maxResults }));
			await dispatch(
				beginActivity({
					type: ActionTypes.SEARCH_PROFILES_BY_FULLNAME,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			const profiles = await dataApi.profiles.searchByFullName({
				textSearch: term,
				maxResults,
			});
			dispatch(syncSearchProfilesByFullNameAction(profiles));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.SYNC_SEARCH_PROFILES_BY_FULLNAME,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

export const resetSearchProfilesByFullNameAction: ActionCreator<
	IResetSearchProfilesByFullNameAction
> = () => ({
	type: ActionTypes.RESET_SEARCH_PROFILES_BY_FULLNAME,
});

export const syncResetSearchProfilesByFullNameAction: ActionCreator<
	ISyncResetSearchProfilesByFullNameAction
> = () => ({
	type: ActionTypes.SYNC_RESET_SEARCH_PROFILES_BY_FULLNAME,
});

export const resetSearchProfilesByFullName = (): IThunk => async (dispatch) => {
	try {
		const activityId = uuidv4();
		dispatch(resetSearchProfilesByFullNameAction());

		await dispatch(
			beginActivity({
				type: ActionTypes.RESET_SEARCH_PROFILES_BY_FULLNAME,
				uuid: activityId,
			}),
		);
		dispatch(syncResetSearchProfilesByFullNameAction());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SYNC_RESET_SEARCH_PROFILES_BY_FULLNAME,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};

export const findFriendsSuggestionsAction: ActionCreator<IFindFriendsSuggestionsAction> = (
	findFriendsSuggestionsInput: any,
) => ({
	type: ActionTypes.FIND_FRIENDS_SUGGESTIONS,
	payload: findFriendsSuggestionsInput,
});

export const syncFindFriendsSuggestionsAction: ActionCreator<ISyncFindFriendsSuggestionsAction> = (
	profiles: IFriendSuggestionData[],
) => ({
	type: ActionTypes.SYNC_FIND_FRIENDS_SUGGESTIONS,
	payload: profiles,
});

export const findFriendsSuggestions = ({
	maxResults,
}: IFindFriendsSuggestionsInput): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();

	try {
		dispatch(findFriendsSuggestionsAction({ maxResults }));
		await dispatch(
			beginActivity({
				type: ActionTypes.FIND_FRIENDS_SUGGESTIONS,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const profiles = await dataApi.profiles.findFriendsSuggestions({
			maxResults: 10,
		});
		await dispatch(syncFindFriendsSuggestionsAction(profiles));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SYNC_FIND_FRIENDS_SUGGESTIONS,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

export const resetFindFriendsSuggestionsAction: ActionCreator<
	IResetFindFriendsSuggestionsAction
> = () => ({
	type: ActionTypes.RESET_FIND_FRIENDS_SUGGESTIONS,
});

export const syncResetFindFriendsSuggestionsAction: ActionCreator<
	ISyncResetFindFriendsSuggestionsAction
> = () => ({
	type: ActionTypes.SYNC_RESET_FIND_FRIENDS_SUGGESTIONS,
});

export const resetFindFriendsSuggestions = (): IThunk => async (dispatch) => {
	const activityId = uuidv4();
	try {
		dispatch(resetFindFriendsSuggestionsAction());
		await dispatch(
			beginActivity({
				type: ActionTypes.RESET_FIND_FRIENDS_SUGGESTIONS,
				uuid: activityId,
			}),
		);
		dispatch(syncResetFindFriendsSuggestionsAction());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SYNC_RESET_FIND_FRIENDS_SUGGESTIONS,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};
