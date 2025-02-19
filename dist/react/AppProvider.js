function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import OptionalReduxProvider from './OptionalReduxProvider';
import ErrorBoundary from './ErrorBoundary';
import AppContext from './AppContext';
import { useAppEvent, useTrackColorSchemeChoice } from './hooks';
import { getAuthenticatedUser, AUTHENTICATED_USER_CHANGED } from '../auth';
import { getConfig } from '../config';
import { CONFIG_CHANGED } from '../constants';
import { getLocale, getMessages, IntlProvider, LOCALE_CHANGED } from '../i18n';
import { basename } from '../initialize';

/**
 * A wrapper component for React-based micro-frontends to initialize a number of common data/
 * context providers.
 *
 * ```
 * subscribe(APP_READY, () => {
 *   ReactDOM.render(
 *     <AppProvider>
 *       <HelloWorld />
 *     </AppProvider>
 *   )
 * });
 * ```
 *
 * This will provide the following to HelloWorld:
 * - An error boundary as described above.
 * - An `AppContext` provider for React context data.
 * - IntlProvider for @edx/frontend-i18n internationalization
 * - Optionally a redux `Provider`. Will only be included if a `store` property is passed to
 * `AppProvider`.
 * - A `Router` for react-router.
 *
 * @param {Object} props
 * @param {Object} [props.store] A redux store.
 * @memberof module:React
 */
export default function AppProvider(_ref) {
  var store = _ref.store,
    children = _ref.children,
    wrapWithRouter = _ref.wrapWithRouter;
  var _useState = useState(getConfig()),
    _useState2 = _slicedToArray(_useState, 2),
    config = _useState2[0],
    setConfig = _useState2[1];
  var _useState3 = useState(getAuthenticatedUser()),
    _useState4 = _slicedToArray(_useState3, 2),
    authenticatedUser = _useState4[0],
    setAuthenticatedUser = _useState4[1];
  var _useState5 = useState(getLocale()),
    _useState6 = _slicedToArray(_useState5, 2),
    locale = _useState6[0],
    setLocale = _useState6[1];
  useTrackColorSchemeChoice();
  useAppEvent(AUTHENTICATED_USER_CHANGED, function () {
    setAuthenticatedUser(getAuthenticatedUser());
  });
  useAppEvent(CONFIG_CHANGED, function () {
    setConfig(getConfig());
  });
  useAppEvent(LOCALE_CHANGED, function () {
    setLocale(getLocale());
  });
  var appContextValue = useMemo(function () {
    return {
      authenticatedUser: authenticatedUser,
      config: config,
      locale: locale
    };
  }, [authenticatedUser, config, locale]);
  return /*#__PURE__*/React.createElement(IntlProvider, {
    locale: locale,
    messages: getMessages()
  }, /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: appContextValue
  }, /*#__PURE__*/React.createElement(OptionalReduxProvider, {
    store: store
  }, wrapWithRouter ? /*#__PURE__*/React.createElement(Router, {
    basename: basename
  }, /*#__PURE__*/React.createElement("div", {
    "data-testid": "browser-router"
  }, children)) : children))));
}
AppProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object,
  children: PropTypes.node.isRequired,
  wrapWithRouter: PropTypes.bool
};
AppProvider.defaultProps = {
  store: null,
  wrapWithRouter: true
};
//# sourceMappingURL=AppProvider.js.map