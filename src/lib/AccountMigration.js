import { APIGenerator } from './APIGenerator.js';
import crypto from 'crypto';
import fetch from 'node-fetch';
import url from 'url';

export class AccountMigration {
    username;
    password;
    accountName;
    portalURL;
    apiRoot;
    apiProvisionRoot;

    accountId;
    clusterId;
    resellerId;
    currentToken;


    constructor(username, password, accountName, portalURL, apiRoot, apiProvisionRoot) {
        this.username = username;
        this.password = password;
        this.accountName = accountName;
        this.portalURL = portalURL;
        this.apiRoot = apiRoot;
        this.apiProvisionRoot = apiProvisionRoot;

    }
    async init() {
        return this.getToken();
    }

    async getToken({ username = null, password = null, accountName = null, apiRoot = null } = {}) {
        username = username ?? this.username;
        password = password ?? this.password;
        accountName = accountName ?? this.accountName;
        apiRoot = apiRoot ?? this.apiRoot;

        let credentialHash = this.md5(`${username}:${password}`);
        let data = { "data": { "credentials": credentialHash, "account_name": accountName, "method": "md5" } };
        let authURL = `${apiRoot}/user_auth`;
        let fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }

        let res = await this.myFetch(authURL, fetchOptions);
        if (!res.error) {
            this.currentToken = res.auth_token;
            this.clusterId = res.data.cluster_id;
            this.accountId = res.data.account_id;
            this.resellerId = res.data.reseller_id;
        }
        return res;
    }

    getProvisionerDevices() {

    }

    getProvisionerAccount() {

    }

    getProvisionerReseller() {

    }

    getProvisionerDevice() {

    }

    getProvisionerAccount() {

    }

    getProvisionerResellerAccount() {

    }

    getProvisionerDeviceFiles() {

    }

    myFetch(myURL, fetchOptions) {
        let urlObject = new url.URL(myURL);
        let filters = fetchOptions.filters ?? {};
        filters.paginate = filters.paginate ?? false;
        delete fetchOptions.filters;
        let responseType = fetchOptions.responseType = fetchOptions.responseType ?? 'json';

        for(let filter in filters) {
            urlObject.searchParams.set(filter, filters[filter]);
        }

        if (!myURL.match(/user_auth/)) {
            fetchOptions.headers = {
                "X-Auth-Token": this.currentToken,
                "X-Kazoo-Cluster-Id": this.clusterId
            }
        }
       
        // Perform the fetch with basic authentication
        let res = fetch(urlObject.toString(), fetchOptions)
            .then(async response => {
                //console.log(response);
                //if (!response.ok) {
                //    throw new Error(`HTTP error! Status: ${response.status}`);
                //}
                let responseData = await response[responseType]();

                return responseData;
            })
            .catch(error => {
                // Handle errors
                //console.error("Fetch error:", error.message);
                return { error: error };
            });

        return res;
    }

    md5(input) {
        const hash = crypto.createHash('md5');
        hash.update(input);
        return hash.digest('hex');
    }



    getAllMainObjects() {
        let a = new APIGenerator();
        let allAPIS = a.getAPI('all');
        for (let module in allAPIS) {
            if (allAPIS[module].list) {
                console.log(module);
                console.log(allAPIS[module].list);
            }
        }
    }
}

//let account = new AccountMigration();
//console.log(account);
//account.getAllMainObjects();