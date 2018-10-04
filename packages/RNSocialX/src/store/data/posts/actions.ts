import {
	ICreatePostInput,
	IPostArrayData,
	IPostReturnData,
	IRemoveCommentInput,
	IRemovePostInput,
	IUnlikeCommentInput,
	IUnlikePostInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { beginActivity, endActivity } from '../../ui/activities';
import {
	ActionTypes,
	ICommentIdInput,
	ICreateCommentAction,
	ICreateCommentInput,
	ICreatePostAction,
	IDateInput,
	IGetPostByPathAction,
	IGetPostsByUsernameAction,
	IGetPublicPostsByDateAction,
	ILikeCommentAction,
	ILikePostAction,
	IPostIdInput,
	IPostPathInput,
	IRemoveCommentAction,
	IRemovePostAction,
	ISyncGetPostByPathAction,
	ISyncGetPostsByUserAction,
	ISyncGetPublicPostsByDateAction,
	IUnlikeCommentAction,
	IUnlikePostAction,
	IUsernameInput,
} from './Types';

const getPostsByUsernameAction: ActionCreator<IGetPostsByUsernameAction> = (
	getPostsByUsernameInput: IUsernameInput,
) => ({
	type: ActionTypes.GET_POSTS_BY_USER,
	payload: getPostsByUsernameInput,
});

const syncGetPostsByUsernameAction: ActionCreator<ISyncGetPostsByUserAction> = (
	posts: IPostArrayData,
) => ({
	type: ActionTypes.SYNC_GET_POSTS_BY_USER,
	payload: posts,
});

export const getPostsByUsername = (
	getPostsByUsernameInput: IUsernameInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(getPostsByUsernameAction(getPostsByUsernameInput));
		dispatch(
			beginActivity({
				type: ActionTypes.GET_POSTS_BY_USER,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const posts = await dataApi.posts.getPostsByUser(getPostsByUsernameInput);
		dispatch(syncGetPostsByUsernameAction(posts));
	} catch (e) {
		/**/
	} finally {
		dispatch(
			endActivity({
				uuid: activityId,
			}),
		);
	}
};

const getPostByPathAction: ActionCreator<IGetPostByPathAction> = (
	getPostPathInput: IPostPathInput,
) => ({
	type: ActionTypes.GET_POST_BY_PATH,
	payload: getPostPathInput,
});

const syncGetPostByPathAction: ActionCreator<ISyncGetPostByPathAction> = (
	post: IPostReturnData,
) => ({
	type: ActionTypes.SYNC_GET_POST_BY_PATH,
	payload: post,
});

export const getPostByPath = (
	getPostPathInput: IPostPathInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(getPostByPathAction(getPostPathInput));
		dispatch(
			beginActivity({
				type: ActionTypes.GET_POST_BY_PATH,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const post = await dataApi.posts.getPostByPath(getPostPathInput);
		dispatch(syncGetPostByPathAction(post));
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const getPublicPostsByDateAction: ActionCreator<IGetPublicPostsByDateAction> = (
	getPostByDateInput: IDateInput,
) => ({
	type: ActionTypes.GET_PUBLIC_POSTS_BY_DATE,
	payload: getPostByDateInput,
});

const syncGetPublicPostsByDateAction: ActionCreator<
	ISyncGetPublicPostsByDateAction
> = (posts: IPostArrayData) => ({
	type: ActionTypes.SYNC_GET_PUBLIC_POSTS_BY_DATE,
	payload: posts,
});

export const getPublicPostsByDate = (
	getPostByDateInput: IDateInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(getPublicPostsByDateAction(getPostByDateInput));
		dispatch(
			beginActivity({
				type: ActionTypes.GET_PUBLIC_POSTS_BY_DATE,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const posts = await dataApi.posts.getPublicPostsByDate(getPostByDateInput);
		dispatch(syncGetPublicPostsByDateAction(posts));
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const createPostAction: ActionCreator<ICreatePostAction> = (
	createPostInput: ICreatePostInput,
) => ({
	type: ActionTypes.CREATE_POST,
	payload: createPostInput,
});

export const createPost = (createPostInput: ICreatePostInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	try {
		dispatch(createPostAction(createPostInput));
		dispatch(
			beginActivity({
				type: ActionTypes.CREATE_POST,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.posts.createPost(createPostInput);
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const likePostAction: ActionCreator<ILikePostAction> = (
	likePostInput: IPostIdInput,
) => ({
	type: ActionTypes.LIKE_POST,
	payload: likePostInput,
});

export const likePost = (likePostInput: IPostIdInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	try {
		dispatch(likePostAction(likePostInput));
		dispatch(
			beginActivity({
				type: ActionTypes.LIKE_POST,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.posts.likePost(likePostInput);
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const removePostAction: ActionCreator<IRemovePostAction> = (
	removePostInput: IRemovePostInput,
) => ({
	type: ActionTypes.REMOVE_POST,
	payload: removePostInput,
});

export const removePost = (removePostInput: IRemovePostInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	try {
		dispatch(removePostAction(removePostInput));
		dispatch(
			beginActivity({
				type: ActionTypes.REMOVE_POST,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.posts.removePost(removePostInput);
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const unlikePostAction: ActionCreator<IUnlikePostAction> = (
	unlikePostInput: IUnlikePostInput,
) => ({
	type: ActionTypes.UNLIKE_POST,
	payload: unlikePostInput,
});

export const unlikePost = (unlikePostInput: IUnlikePostInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	try {
		dispatch(unlikePostAction(unlikePostInput));
		dispatch(
			beginActivity({
				type: ActionTypes.UNLIKE_POST,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.posts.unlikePost(unlikePostInput);
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

// <================= comments =================>
const createCommentAction: ActionCreator<ICreateCommentAction> = (
	createCommentInput: ICreateCommentInput,
) => ({
	type: ActionTypes.CREATE_COMMENT,
	payload: createCommentInput,
});

export const createComment = (
	createCommentInput: ICreateCommentInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(createCommentAction(createCommentInput));
		dispatch(
			beginActivity({
				type: ActionTypes.CREATE_COMMENT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.comments.createComment(createCommentInput);
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const likeCommentAction: ActionCreator<ILikeCommentAction> = (
	likeCommentInput: ICommentIdInput,
) => ({
	type: ActionTypes.LIKE_COMMENT,
	payload: likeCommentInput,
});

export const likeComment = (
	likeCommentInput: ICommentIdInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(likeCommentAction(likeCommentInput));
		dispatch(
			beginActivity({
				type: ActionTypes.LIKE_COMMENT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.comments.likeComment(likeCommentInput);
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const removeCommentAction: ActionCreator<IRemoveCommentAction> = (
	removeCommentInput: IRemoveCommentInput,
) => ({
	type: ActionTypes.REMOVE_COMMENT,
	payload: removeCommentInput,
});

export const removeComment = (
	removeCommentInput: IRemoveCommentInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(removeCommentAction(removeCommentInput));
		dispatch(
			beginActivity({
				type: ActionTypes.REMOVE_COMMENT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.comments.removeComment(removeCommentInput);
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const unlikeCommentAction: ActionCreator<IUnlikeCommentAction> = (
	unlikeCommentInput: IUnlikeCommentInput,
) => ({
	type: ActionTypes.UNLIKE_COMMENT,
	payload: unlikeCommentInput,
});

export const unlikeComment = (
	unlikeCommentInput: IUnlikeCommentInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(unlikeCommentAction(unlikeCommentInput));
		dispatch(
			beginActivity({
				type: ActionTypes.UNLIKE_COMMENT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.comments.unlikeComment(unlikeCommentInput);
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};
