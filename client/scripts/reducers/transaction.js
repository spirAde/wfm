import createReducer from '../utils/createReducer';

import {
  GET_ACCOUNT_TRANSACTIONS_REQUEST,
  GET_ACCOUNT_TRANSACTIONS_SUCCESS,
  GET_ACCOUNT_TRANSACTIONS_FAILURE,

  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE,

  GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_REQUEST,
  GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_SUCCESS,
  GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_FAILURE,

  CLEAR_TRANSACTIONS,
} from '../actions/transaction';

export const initialState = {
  accountTransactions: {
    savings: [{"id":4453,"amount":"1.0","user_id":257,"bank_instruction_id":"5322825","created_at":"2017-02-20T09:38:05.071-05:00","updated_at":"2017-02-20T09:38:18.588-05:00","account_id":"1638","status":"not_enough_money","bank_name":"BANK OF AMERICA, N.A.","client_bank_account_number":"********3905","type":"deposit","error_text":null,"closed_on_dashboard":true,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":221,"completion_method":null,"initial_deposit":false},{"id":4451,"amount":"123.0","user_id":257,"bank_instruction_id":"5322825","created_at":"2017-02-20T09:38:04.987-05:00","updated_at":"2017-02-20T09:38:18.247-05:00","account_id":"1638","status":"not_enough_money","bank_name":"BANK OF AMERICA, N.A.","client_bank_account_number":"********3905","type":"deposit","error_text":null,"closed_on_dashboard":true,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":217,"completion_method":null,"initial_deposit":false},{"id":4446,"amount":"12.0","user_id":257,"bank_instruction_id":"5322825","created_at":"2017-02-20T09:38:04.596-05:00","updated_at":"2017-02-20T09:38:15.485-05:00","account_id":"1638","status":"not_enough_money","bank_name":"BANK OF AMERICA, N.A.","client_bank_account_number":"********3905","type":"deposit","error_text":null,"closed_on_dashboard":true,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":192,"completion_method":null,"initial_deposit":false},{"id":4436,"amount":"200.0","user_id":257,"bank_instruction_id":null,"created_at":"2017-02-20T03:39:26.484-05:00","updated_at":"2017-02-20T09:38:52.533-05:00","account_id":"1638","status":"pending_on_vanare","bank_name":null,"client_bank_account_number":null,"type":"internal","error_text":null,"closed_on_dashboard":false,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":"901336860","complete_by_td_at":null,"vanare_transaction_id":"124881","recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4435,"amount":"200.0","user_id":257,"bank_instruction_id":"5322825","created_at":"2017-02-20T03:34:38.500-05:00","updated_at":"2017-02-20T09:38:14.803-05:00","account_id":"1638","status":"pending_on_vanare","bank_name":"BANK OF AMERICA, N.A.","client_bank_account_number":"********3905","type":"withdraw","error_text":null,"closed_on_dashboard":false,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4413,"amount":"1.0","user_id":257,"bank_instruction_id":"5322825","created_at":"2017-02-14T06:17:26.780-05:00","updated_at":"2017-02-14T06:17:28.964-05:00","account_id":"1638","status":"not_enough_money","bank_name":"BANK OF AMERICA, N.A.","client_bank_account_number":"********3905","type":"deposit","error_text":null,"closed_on_dashboard":false,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4403,"amount":"1.0","user_id":257,"bank_instruction_id":"5322825","created_at":"2017-02-13T11:00:20.842-05:00","updated_at":"2017-02-13T11:00:33.925-05:00","account_id":"1638","status":"not_enough_money","bank_name":"BANK OF AMERICA, N.A.","client_bank_account_number":"********3905","type":"deposit","error_text":null,"closed_on_dashboard":true,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":192,"completion_method":null,"initial_deposit":false},{"id":4347,"amount":"1.0","user_id":257,"bank_instruction_id":"5322825","created_at":"2017-02-06T04:45:19.304-05:00","updated_at":"2017-02-06T04:45:28.686-05:00","account_id":"1638","status":"not_enough_money","bank_name":"BANK OF AMERICA, N.A.","client_bank_account_number":"********3905","type":"deposit","error_text":null,"closed_on_dashboard":true,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":192,"completion_method":null,"initial_deposit":false},{"id":4346,"amount":"123.0","user_id":257,"bank_instruction_id":"5322825","created_at":"2017-02-06T04:36:36.669-05:00","updated_at":"2017-02-06T04:36:39.374-05:00","account_id":"1638","status":"not_enough_money","bank_name":"BANK OF AMERICA, N.A.","client_bank_account_number":"********3905","type":"deposit","error_text":null,"closed_on_dashboard":true,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":189,"completion_method":null,"initial_deposit":false},{"id":4345,"amount":"1.0","user_id":257,"bank_instruction_id":"5322825","created_at":"2017-02-06T04:34:49.026-05:00","updated_at":"2017-02-06T04:34:51.841-05:00","account_id":"1638","status":"not_enough_money","bank_name":"BANK OF AMERICA, N.A.","client_bank_account_number":"********3905","type":"deposit","error_text":null,"closed_on_dashboard":true,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":188,"completion_method":null,"initial_deposit":false}],
    investment: [{"id":4436,"amount":"200.0","user_id":257,"bank_instruction_id":null,"created_at":"2017-02-20T03:39:26.484-05:00","updated_at":"2017-02-20T09:38:52.533-05:00","account_id":"1638","status":"pending_on_vanare","bank_name":null,"client_bank_account_number":null,"type":"internal","error_text":null,"closed_on_dashboard":false,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":"901336860","complete_by_td_at":null,"vanare_transaction_id":"124881","recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4324,"amount":"3.0","user_id":257,"bank_instruction_id":"3799266","created_at":"2017-02-03T06:26:19.518-05:00","updated_at":"2017-02-03T06:26:21.300-05:00","account_id":"1639","status":"not_enough_money","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********8671","type":"deposit","error_text":null,"closed_on_dashboard":false,"account_number":"901336860","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4321,"amount":"2.0","user_id":257,"bank_instruction_id":"3799266","created_at":"2017-02-02T13:21:56.953-05:00","updated_at":"2017-02-02T13:22:01.417-05:00","account_id":"1639","status":"pending_on_vanare","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********8671","type":"withdraw","error_text":null,"closed_on_dashboard":false,"account_number":"901336860","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4317,"amount":"2.0","user_id":257,"bank_instruction_id":"3799266","created_at":"2017-02-02T13:17:48.045-05:00","updated_at":"2017-02-02T13:17:52.770-05:00","account_id":"1639","status":"pending_on_vanare","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********8671","type":"withdraw","error_text":null,"closed_on_dashboard":false,"account_number":"901336860","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4314,"amount":"2.0","user_id":257,"bank_instruction_id":null,"created_at":"2017-02-02T13:02:22.112-05:00","updated_at":"2017-02-02T13:02:28.134-05:00","account_id":"1638","status":"pending_on_vanare","bank_name":null,"client_bank_account_number":null,"type":"internal","error_text":null,"closed_on_dashboard":false,"account_number":"901132360","ira_fund_date":null,"receiving_account_number":"901336860","complete_by_td_at":null,"vanare_transaction_id":"124843","recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4309,"amount":"2.0","user_id":257,"bank_instruction_id":null,"created_at":"2017-02-01T15:03:25.856-05:00","updated_at":"2017-02-01T15:03:28.823-05:00","account_id":"1639","status":"pending_on_vanare","bank_name":null,"client_bank_account_number":null,"type":"internal","error_text":null,"closed_on_dashboard":false,"account_number":"901336860","ira_fund_date":null,"receiving_account_number":"901132360","complete_by_td_at":null,"vanare_transaction_id":"124841","recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4285,"amount":"25.25","user_id":257,"bank_instruction_id":"3799266","created_at":"2017-01-30T11:00:20.612-05:00","updated_at":"2017-01-30T11:00:31.604-05:00","account_id":"1639","status":"not_enough_money","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********8671","type":"deposit","error_text":null,"closed_on_dashboard":true,"account_number":"901336860","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":153,"completion_method":null,"initial_deposit":false},{"id":4248,"amount":"25.25","user_id":257,"bank_instruction_id":"3799266","created_at":"2017-01-23T11:00:19.841-05:00","updated_at":"2017-01-23T11:00:48.977-05:00","account_id":"1639","status":"not_enough_money","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********8671","type":"deposit","error_text":null,"closed_on_dashboard":true,"account_number":"901336860","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":153,"completion_method":null,"initial_deposit":false},{"id":4209,"amount":"25.25","user_id":257,"bank_instruction_id":"3799266","created_at":"2017-01-16T11:00:20.165-05:00","updated_at":"2017-01-16T11:00:51.879-05:00","account_id":"1639","status":"not_enough_money","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********8671","type":"deposit","error_text":null,"closed_on_dashboard":true,"account_number":"901336860","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":153,"completion_method":null,"initial_deposit":false},{"id":4171,"amount":"25.25","user_id":257,"bank_instruction_id":"3799266","created_at":"2017-01-09T11:00:19.703-05:00","updated_at":"2017-01-09T11:01:28.526-05:00","account_id":"1639","status":"not_enough_money","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********8671","type":"deposit","error_text":null,"closed_on_dashboard":true,"account_number":"901336860","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":153,"completion_method":null,"initial_deposit":false}],
    retirement: [{"id":4361,"amount":"1.0","user_id":257,"bank_instruction_id":"4453188","created_at":"2017-02-06T12:45:50.151-05:00","updated_at":"2017-02-06T12:45:51.852-05:00","account_id":"1640","status":"not_enough_money","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********0628","type":"deposit","error_text":null,"closed_on_dashboard":false,"account_number":"901504160","ira_fund_date":"2017-01-01","receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4360,"amount":"1.0","user_id":257,"bank_instruction_id":"4453188","created_at":"2017-02-06T12:45:44.164-05:00","updated_at":"2017-02-06T12:45:46.169-05:00","account_id":"1640","status":"not_enough_money","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********0628","type":"deposit","error_text":null,"closed_on_dashboard":false,"account_number":"901504160","ira_fund_date":"2017-01-01","receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4332,"amount":"5.0","user_id":257,"bank_instruction_id":"4453188","created_at":"2017-02-05T14:59:52.247-05:00","updated_at":"2017-02-05T14:59:54.293-05:00","account_id":"1640","status":"not_enough_money","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********0628","type":"deposit","error_text":null,"closed_on_dashboard":false,"account_number":"901504160","ira_fund_date":"2017-01-01","receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4330,"amount":"2.0","user_id":257,"bank_instruction_id":"4453188","created_at":"2017-02-05T12:22:13.118-05:00","updated_at":"2017-02-05T12:22:18.295-05:00","account_id":"1640","status":"pending_on_vanare","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********0628","type":"withdraw","error_text":null,"closed_on_dashboard":false,"account_number":"901504160","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4325,"amount":"3.0","user_id":257,"bank_instruction_id":"4453188","created_at":"2017-02-03T06:26:23.838-05:00","updated_at":"2017-02-03T06:26:25.548-05:00","account_id":"1640","status":"not_enough_money","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********0628","type":"deposit","error_text":null,"closed_on_dashboard":false,"account_number":"901504160","ira_fund_date":"2017-01-01","receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4322,"amount":"2.0","user_id":257,"bank_instruction_id":"4453188","created_at":"2017-02-02T13:22:02.635-05:00","updated_at":"2017-02-02T13:22:05.091-05:00","account_id":"1640","status":"pending_on_vanare","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********0628","type":"withdraw","error_text":null,"closed_on_dashboard":false,"account_number":"901504160","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4318,"amount":"2.0","user_id":257,"bank_instruction_id":"4453188","created_at":"2017-02-02T13:17:55.175-05:00","updated_at":"2017-02-02T13:17:58.160-05:00","account_id":"1640","status":"pending_on_vanare","bank_name":"WELLS FARGO BANK","client_bank_account_number":"********0628","type":"withdraw","error_text":null,"closed_on_dashboard":false,"account_number":"901504160","ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4315,"amount":"2.0","user_id":257,"bank_instruction_id":null,"created_at":"2017-02-02T13:06:37.383-05:00","updated_at":"2017-02-02T13:06:41.003-05:00","account_id":"1640","status":"pending_on_vanare","bank_name":null,"client_bank_account_number":null,"type":"internal","error_text":null,"closed_on_dashboard":false,"account_number":"901504160","ira_fund_date":null,"receiving_account_number":"901132360","complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4310,"amount":"123.0","user_id":257,"bank_instruction_id":null,"created_at":"2017-02-02T05:18:41.022-05:00","updated_at":"2017-02-02T05:18:44.002-05:00","account_id":"1640","status":"pending_on_vanare","bank_name":null,"client_bank_account_number":null,"type":"internal","error_text":null,"closed_on_dashboard":false,"account_number":"901504160","ira_fund_date":null,"receiving_account_number":"901132360","complete_by_td_at":null,"vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false},{"id":4230,"amount":"1000.0","user_id":257,"bank_instruction_id":"234234","created_at":"2017-01-20T10:41:06.410-05:00","updated_at":"2017-01-20T10:41:06.410-05:00","account_id":"1640","status":"complete","bank_name":null,"client_bank_account_number":null,"type":"withdraw","error_text":null,"closed_on_dashboard":false,"account_number":null,"ira_fund_date":null,"receiving_account_number":null,"complete_by_td_at":"2017-01-20T10:41:06.408-05:00","vanare_transaction_id":null,"recurring_transaction_group_id":null,"completion_method":null,"initial_deposit":false}],
  },
  transactions: [
    {
      "id":4324,
      "amount":"3.0",
      "user_id":257,
      "bank_instruction_id":"3799266",
      "created_at":"2017-02-03T06:26:19.518-05:00",
      "updated_at":"2017-02-03T06:26:21.300-05:00",
      "account_id":"1639",
      "status":"not_enough_money",
      "bank_name":"WELLS FARGO BANK",
      "client_bank_account_number":"********8671",
      "type":"deposit",
      "error_text":null,
      "closed_on_dashboard":false,
      "account_number":"901336860",
      "ira_fund_date":null,
      "receiving_account_number":null,
      "complete_by_td_at":null,
      "vanare_transaction_id":null,
      "recurring_transaction_group_id":null,
      "completion_method":null,
      "initial_deposit":false
    },
    {
      "id":4321,
      "amount":"2.0",
      "user_id":257,
      "bank_instruction_id":"3799266",
      "created_at":"2017-02-02T13:21:56.953-05:00",
      "updated_at":"2017-02-02T13:22:01.417-05:00",
      "account_id":"1639",
      "status":"pending_on_vanare",
      "bank_name":"WELLS FARGO BANK",
      "client_bank_account_number":"********8671",
      "type":"withdraw",
      "error_text":null,
      "closed_on_dashboard":false,
      "account_number":"901336860",
      "ira_fund_date":null,
      "receiving_account_number":null,
      "complete_by_td_at":null,
      "vanare_transaction_id":null,
      "recurring_transaction_group_id":null,
      "completion_method":null,
      "initial_deposit":false
    },
    {
      "id":4317,
      "amount":"2.0",
      "user_id":257,
      "bank_instruction_id":"3799266",
      "created_at":"2017-02-02T13:17:48.045-05:00",
      "updated_at":"2017-02-02T13:17:52.770-05:00",
      "account_id":"1639",
      "status":"pending_on_vanare",
      "bank_name":"WELLS FARGO BANK",
      "client_bank_account_number":"********8671",
      "type":"withdraw",
      "error_text":null,
      "closed_on_dashboard":false,
      "account_number":"901336860",
      "ira_fund_date":null,
      "receiving_account_number":null,
      "complete_by_td_at":null,
      "vanare_transaction_id":null,
      "recurring_transaction_group_id":null,
      "completion_method":null,
      "initial_deposit":false
    },
    {
      "id":4314,
      "amount":"2.0",
      "user_id":257,
      "bank_instruction_id":null,
      "created_at":"2017-02-02T13:02:22.112-05:00",
      "updated_at":"2017-02-02T13:02:28.134-05:00",
      "account_id":"1638",
      "status":"pending_on_vanare",
      "bank_name":null,
      "client_bank_account_number":null,
      "type":"internal",
      "error_text":null,
      "closed_on_dashboard":false,
      "account_number":"901132360",
      "ira_fund_date":null,
      "receiving_account_number":"901336860",
      "complete_by_td_at":null,
      "vanare_transaction_id":"124843",
      "recurring_transaction_group_id":null,
      "completion_method":null,
      "initial_deposit":false
    },
    {
      "id":4309,
      "amount":"2.0",
      "user_id":257,
      "bank_instruction_id":null,
      "created_at":"2017-02-01T15:03:25.856-05:00",
      "updated_at":"2017-02-01T15:03:28.823-05:00",
      "account_id":"1639",
      "status":"pending_on_vanare",
      "bank_name":null,
      "client_bank_account_number":null,
      "type":"internal",
      "error_text":null,
      "closed_on_dashboard":false,
      "account_number":"901336860",
      "ira_fund_date":null,
      "receiving_account_number":"901132360",
      "complete_by_td_at":null,
      "vanare_transaction_id":"124841",
      "recurring_transaction_group_id":null,
      "completion_method":null,
      "initial_deposit":false
    },
    {
      "id":4285,
      "amount":"25.25",
      "user_id":257,
      "bank_instruction_id":"3799266",
      "created_at":"2017-01-30T11:00:20.612-05:00",
      "updated_at":"2017-01-30T11:00:31.604-05:00",
      "account_id":"1639",
      "status":"not_enough_money",
      "bank_name":"WELLS FARGO BANK",
      "client_bank_account_number":"********8671",
      "type":"deposit",
      "error_text":null,
      "closed_on_dashboard":true,
      "account_number":"901336860",
      "ira_fund_date":null,
      "receiving_account_number":null,
      "complete_by_td_at":null,
      "vanare_transaction_id":null,
      "recurring_transaction_group_id":153,
      "completion_method":null,
      "initial_deposit":false
    },
    {
      "id":4248,
      "amount":"25.25",
      "user_id":257,
      "bank_instruction_id":"3799266",
      "created_at":"2017-01-23T11:00:19.841-05:00",
      "updated_at":"2017-01-23T11:00:48.977-05:00",
      "account_id":"1639",
      "status":"not_enough_money",
      "bank_name":"WELLS FARGO BANK",
      "client_bank_account_number":"********8671",
      "type":"deposit",
      "error_text":null,
      "closed_on_dashboard":true,
      "account_number":"901336860",
      "ira_fund_date":null,
      "receiving_account_number":null,
      "complete_by_td_at":null,
      "vanare_transaction_id":null,
      "recurring_transaction_group_id":153,
      "completion_method":null,
      "initial_deposit":false
    },
    {
      "id":4209,
      "amount":"25.25",
      "user_id":257,
      "bank_instruction_id":"3799266",
      "created_at":"2017-01-16T11:00:20.165-05:00",
      "updated_at":"2017-01-16T11:00:51.879-05:00",
      "account_id":"1639",
      "status":"not_enough_money",
      "bank_name":"WELLS FARGO BANK",
      "client_bank_account_number":"********8671",
      "type":"deposit",
      "error_text":null,
      "closed_on_dashboard":true,
      "account_number":"901336860",
      "ira_fund_date":null,
      "receiving_account_number":null,
      "complete_by_td_at":null,
      "vanare_transaction_id":null,
      "recurring_transaction_group_id":153,
      "completion_method":null,
      "initial_deposit":false
    },
    {
      "id":4171,
      "amount":"25.25",
      "user_id":257,
      "bank_instruction_id":"3799266",
      "created_at":"2017-01-09T11:00:19.703-05:00",
      "updated_at":"2017-01-09T11:01:28.526-05:00",
      "account_id":"1639",
      "status":"not_enough_money",
      "bank_name":"WELLS FARGO BANK",
      "client_bank_account_number":"********8671",
      "type":"deposit",
      "error_text":null,
      "closed_on_dashboard":true,
      "account_number":"901336860",
      "ira_fund_date":null,
      "receiving_account_number":null,
      "complete_by_td_at":null,
      "vanare_transaction_id":null,
      "recurring_transaction_group_id":153,
      "completion_method":null,
      "initial_deposit":false
    },
    {
      "id":3991,
      "amount":"25.25",
      "user_id":257,
      "bank_instruction_id":"3799266",
      "created_at":"2017-01-02T11:00:23.771-05:00",
      "updated_at":"2017-05-12T08:00:15.449-04:00",
      "account_id":"1639",
      "status":"pending_on_vanare",
      "bank_name":"WELLS FARGO BANK",
      "client_bank_account_number":"********8671",
      "type":"deposit",
      "error_text":null,
      "closed_on_dashboard":true,
      "account_number":"901336860",
      "ira_fund_date":null,
      "receiving_account_number":null,
      "complete_by_td_at":null,
      "vanare_transaction_id":"58",
      "recurring_transaction_group_id":153,
      "completion_method":null,
      "initial_deposit":false
    }
  ],
  isLastTransactions: false,
  anySuccessWithdrawTransaction: undefined,
  transactionsAreLoading: false,
  transactionsError: null,
};

export default createReducer({
  [GET_ACCOUNT_TRANSACTIONS_REQUEST](state) {
    return state;
  },

  [GET_ACCOUNT_TRANSACTIONS_SUCCESS](state, action) {
    return state;
  },

  [GET_ACCOUNT_TRANSACTIONS_FAILURE](state) {
    return state;
  },

  [GET_TRANSACTIONS_REQUEST](state) {
    return state;
  },

  [GET_TRANSACTIONS_SUCCESS](state, action) {
    return state;
  },

  [GET_TRANSACTIONS_FAILURE](state) {
    return state;
  },

  [GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_REQUEST](state) {
    return state;
  },

  [GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_SUCCESS](state, action) {
    return state;
  },

  [GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_FAILURE](state) {
    return state;
  },

  [CLEAR_TRANSACTIONS](state) {
    return state;
  },
}, initialState);
