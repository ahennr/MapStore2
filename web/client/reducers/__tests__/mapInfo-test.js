/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var expect = require('expect');
var mapInfo = require('../mapInfo');

describe('Test the mapInfo reducer', () => {
    it('returns original state on unrecognized action', () => {
        let state = mapInfo(1, {type: 'UNKNOWN'});
        expect(state).toBe(1);
    });

    it('creates a general error ', () => {
        let testAction = {
            type: 'ERROR_FEATURE_INFO',
            error: "error",
            requestParams: "params",
            layerMetadata: "meta"
        };

        let state = mapInfo({}, testAction);
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(1);
        expect(state.responses[0].response).toBe("error");
        expect(state.responses[0].queryParams).toBe("params");
        expect(state.responses[0].layerMetadata).toBe("meta");

        state = mapInfo({responses: []}, testAction);
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(1);
        expect(state.responses[0].response).toBe("error");
        expect(state.responses[0].queryParams).toBe("params");
        expect(state.responses[0].layerMetadata).toBe("meta");

        state = mapInfo({responses: ["test"]}, testAction);
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(2);
        expect(state.responses[0]).toBe("test");
        expect(state.responses[1].response).toBe("error");
        expect(state.responses[1].queryParams).toBe("params");
        expect(state.responses[1].layerMetadata).toBe("meta");
    });

    it('creates an wms feature info exception', () => {
        let testAction = {
            type: 'EXCEPTIONS_FEATURE_INFO',
            exceptions: "exception",
            requestParams: "params",
            layerMetadata: "meta"
        };

        let state = mapInfo({}, testAction);
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(1);
        expect(state.responses[0].response).toBe("exception");
        expect(state.responses[0].queryParams).toBe("params");
        expect(state.responses[0].layerMetadata).toBe("meta");

        state = mapInfo({responses: []}, testAction);
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(1);
        expect(state.responses[0].response).toBe("exception");
        expect(state.responses[0].queryParams).toBe("params");
        expect(state.responses[0].layerMetadata).toBe("meta");


        state = mapInfo({responses: ["test"]}, testAction);
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(2);
        expect(state.responses[0]).toBe("test");
        expect(state.responses[1].response).toBe("exception");
        expect(state.responses[1].queryParams).toBe("params");
        expect(state.responses[1].layerMetadata).toBe("meta");

    });

    it('creates a feature info data from succesfull request', () => {
        let testAction = {
            type: 'LOAD_FEATURE_INFO',
            data: "data",
            requestParams: "params",
            layerMetadata: "meta"
        };

        let state = mapInfo({}, testAction);
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(1);
        expect(state.responses[0].response).toBe("data");
        expect(state.responses[0].queryParams).toBe("params");
        expect(state.responses[0].layerMetadata).toBe("meta");

        state = mapInfo({responses: []}, testAction);
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(1);
        expect(state.responses[0].response).toBe("data");
        expect(state.responses[0].queryParams).toBe("params");
        expect(state.responses[0].layerMetadata).toBe("meta");

        state = mapInfo({responses: ["test"]}, testAction);
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(2);
        expect(state.responses[0]).toBe("test");
        expect(state.responses[1].response).toBe("data");
        expect(state.responses[1].queryParams).toBe("params");
        expect(state.responses[1].layerMetadata).toBe("meta");
    });

    it('creates a new mapinfo request', () => {
        let state = mapInfo({}, {type: 'NEW_MAPINFO_REQUEST', request: "request"});
        expect(state.requests).toExist();
        expect(state.requests.length).toBe(1);
        expect(state.requests[0]).toBe("request");

        state = mapInfo({requests: []}, {type: 'NEW_MAPINFO_REQUEST', request: "request"});
        expect(state.requests).toExist();
        expect(state.requests.length).toBe(1);
        expect(state.requests[0]).toBe("request");

        state = mapInfo({requests: ["test"]}, {type: 'NEW_MAPINFO_REQUEST', request: "request"});
        expect(state.requests).toExist();
        expect(state.requests.length).toBe(2);
        expect(state.requests[0]).toBe("test");
        expect(state.requests[1]).toBe("request");
    });

    it('clear request queue', () => {
        let state = mapInfo({}, {type: 'PURGE_MAPINFO_RESULTS'});
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(0);

        state = mapInfo({responses: []}, {type: 'PURGE_MAPINFO_RESULTS'});
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(0);

        state = mapInfo({responses: ["test"]}, {type: 'PURGE_MAPINFO_RESULTS'});
        expect(state.responses).toExist();
        expect(state.responses.length).toBe(0);
    });

    it('set a new point on map which has been clicked', () => {
        let state = mapInfo({}, {type: 'CLICK_ON_MAP', point: "p"});
        expect(state.clickPoint).toExist();
        expect(state.clickPoint).toBe('p');

        state = mapInfo({clickPoint: 'oldP'}, {type: 'CLICK_ON_MAP', point: "p"});
        expect(state.clickPoint).toExist();
        expect(state.clickPoint).toBe('p');
    });

    it('enables map info', () => {
        let state = mapInfo({}, {type: 'CHANGE_MAPINFO_STATE', enabled: true});
        expect(state).toExist();
        expect(state.enabled).toBe(true);

        state = mapInfo({}, {type: 'CHANGE_MAPINFO_STATE', enabled: false});
        expect(state).toExist();
        expect(state.enabled).toBe(false);
    });
});