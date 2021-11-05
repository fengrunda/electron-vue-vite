import { ActionContext, MutationTree, ActionTree } from 'vuex'
import { RootState } from '../index'
import cloneDeep from 'lodash/cloneDeep'
import router from '@/render/router/index'

export interface CorpInfo {
  agentId: number,
  corpId: string,
  corpName: string,
  registId: string,
  suiteId: string,
  externalUserId: string
}

export interface CommunityInfo {
  communityId: string,
  communityName: string,
  cityName: string,
  tel: string
}

export interface UserStateUserInfo {
  avatar?: string,
  id?: string,
  nickName?: string,
  openId?: string,
  gender?: number,
  unionId?: string,
  email?: string,
  mobile?: string,
  name?: string
}
const USER_INFO: UserStateUserInfo = {
  avatar: '', // "https://thirdwx.qlogo.cn/mmopen/vi_32/md2RduiaZ8ia3rBicWPCrpHUwib4pibGXznFpWacnXv5iaVqbmKVjfBINb8ibY7LIDqeDGuCCQIHpF33hGkibKpicwArdQw/132"
  id: '', // "2"
  nickName: '', // "Da"
  openId: '', // "ortnYvzx8nrs9l6UejkVJLwxFWGM"
  gender: 0, // 1
  unionId: '', // "oAKvIv3WB2lkvRZfd0VJVp208DPk"
  email: '',
  mobile: '',
  name: ''
}

const COMMUNITY_INFO: CommunityInfo = {
  communityId: '',
  communityName: '',
  cityName: '',
  tel: ''
}
export interface UserState {
  thirdSession: string,
  processingFunLogin: any,
  userInfo: UserStateUserInfo,
  corpList: { [index: string]: CorpInfo },
  currentCorpId: string,
  communityInfo: CommunityInfo,
  communityList: Array<CommunityInfo>
}

const state: UserState = {
  thirdSession: '',
  processingFunLogin: null,
  userInfo: (() => {
    return cloneDeep(USER_INFO)
  })(),
  corpList: {}, // [{agentId: 1000022, corpId: "wwbed5b3d4eaf1d106", corpName: "自在社区", registId: "1", suiteId: "wwf7d785e7f14e3aa1"}]
  currentCorpId: '', // "wwbed5b3d4eaf1d106"
  communityInfo: (() => {
    return cloneDeep(COMMUNITY_INFO)
  })(),
  communityList: []
}
const mutations: MutationTree<UserState> = {
  SET_SESSION: (state, payload: string): void => {
    state.thirdSession = payload
  },
  SET_USER_INFO: (state, payload: UserStateUserInfo): void => {
    state.userInfo = { ...state.userInfo, ...payload }
  },
  SET_USER_LOGIN_STATUS: (state, payload: any): void => {
    state.processingFunLogin = payload
  },
  SET_CORP_LIST: (state, payload: { [index: string]: CorpInfo }): void => {
    state.corpList = payload
  },
  SET_CORP_ID: (state, payload: string): void => {
    state.currentCorpId = payload
  },
  SET_COMMUNITY_INFO: (state, payload: CommunityInfo): void => {
    state.communityInfo = { ...state.communityInfo, ...payload }
  },
  SET_COMMUNITY_LIST: (state, payload: Array<CommunityInfo>): void => {
    state.communityList = payload
  },
  REMOVE_USER_INFO: (state): void => {
    state.userInfo = cloneDeep(USER_INFO)
  },
  REMOVE_SESSION: (state): void => {
    state.thirdSession = ''
  },
  REMOVE_USER_LOGIN_STATUS: (state): void => {
    state.processingFunLogin = null
  },
  REMOVE_CORP_LIST: (state): void => {
    state.corpList = {}
  },
  REMOVE_CORP_ID: (state): void => {
    state.currentCorpId = ''
  },
  REMOVE_COMMUNITY_INFO: (state): void => {
    state.communityInfo = cloneDeep(COMMUNITY_INFO)
  }
}

const actions: ActionTree<UserState, RootState> = {
  updateThirdSession: ({ dispatch, commit, state, getters, rootState, rootGetters }: ActionContext<UserState, RootState>, payload: any): void => {
    commit('SET_SESSION', payload)
  },
  logout: ({ dispatch, commit, state, getters, rootState, rootGetters }: ActionContext<UserState, RootState>, payload: any): void => {
    commit('REMOVE_USER_INFO')
    commit('REMOVE_SESSION')
    commit('REMOVE_USER_LOGIN_STATUS')
    commit('REMOVE_CORP_LIST')
    commit('REMOVE_CORP_ID')
    commit('REMOVE_COMMUNITY_INFO')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
