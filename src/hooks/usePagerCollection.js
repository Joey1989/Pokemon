import { useReducer } from 'react';

export default function usePagerCollection() {
    const pageReducer = (state, action) => {
        switch (action.type) {
          case 'ADVANCE_PAGE':
            return { ...state, page: state.page + 30 }
          default:
            return state;
        }
    }

    const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });

    return [pager, pagerDispatch];
}
