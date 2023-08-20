import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../redux/api/api-slice';

export const initialState = { list: [] };
const slice = 'visitCustomerMeasurement';

export const {
  endpoints,
  useReadVisitCustumerByLaserIdQuery,
  useReadVisitCustumerByLaserNameQuery,
  useUpdateVisitMeasurementMutation,
  useReadAwardsQuery,
} = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: () => 'test',
    }),
    readVisitCustumerByLaserId: build.query({
      query: (id) => `/custumerMeasurement/${id}`,
      providesTags: ['Laser'],
    }),
    readVisitCustumerByLaserName: build.query({
      query: (name) => `/custumerMeasurement/${name}`,
    }),
    updateVisitMeasurement: build.mutation({
      query: (body) => {
        return {
          url: `/custumerMeasurement/${body.id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
})


export const { reducer, actions } = createSlice({
  name: slice,
  initialState,
  reducers: {
    addTeamMember: (state, { payload }) => {
      state.list.push(payload);
    },
    updateList: (state, { payload }) => {
      const keys = Object.keys(payload);
      state.list =  state.list.map(e => {
        if(e.id === payload.id) {
          const obj = { ...e, [keys[1]]: payload[keys[1]]}         
          return obj;
        }
        else {
          return e;
        }
      });
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      endpoints.readVisitCustumerByLaserName.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      },
    );
  },
});

export { slice };