import { AccountMigration } from './lib/AccountMigration.js';
import { APIGenerator } from './lib/APIGenerator.js';
import fs from 'fs';
import path from 'path';

let dataDir = '../sourceData';
!fs.existsSync(dataDir) ? fs.mkdirSync(dataDir) : undefined;

let username, password, accountName, portalURL, apiRoot, apiProvisionRoot;


username = 'transfer';
password = 'ZrVMBh5dCzJsgcj2';
accountName = 'Rocky Top Vet Hospital - Afton';
portalURL = 'https://portal.upcalls.co';
apiRoot = 'https://portal.upcalls.co:8443/v2';
apiProvisionRoot = 'https://p3.zswitch.net';

let accountSource = new AccountMigration(username, password, accountName, portalURL, apiRoot, apiProvisionRoot);
function fileWrite(fullPath, data) {

    const directoryPath = path.dirname(fullPath);
    const fileName = path.basename(fullPath);
    if(data instanceof ArrayBuffer) {
        data = Buffer.from(data);
    };

    !fs.existsSync(directoryPath) ? fs.mkdirSync(directoryPath, { recursive: true }) : undefined;
    fs.writeFile(fullPath, data, (error) => {
        if (error) {
          console.error('Error writing file:', error.message);
        } else {
          console.log('File written successfully!');
        }
    });
}


async function main() {
    let res = await accountSource.init();


    //res = await getProvisionerData(accountSource);
    res = await getVoicemailData(accountSource)
    console.log(res);

}

/**
 * @param AccountMigration a1
 */
async function getProvisionerData(a1) {
    let apiGen = new APIGenerator();
    let methodObject, res;
    /** Get resller Doc prosionerAccounts.getReseller */
    methodObject = apiGen.getAPI('provisionerAccounts.getReseller', { accountId: a1.accountId, resellerId: a1.resellerId, apiProvisionRoot: a1.apiProvisionRoot });
    console.log(methodObject);
    res = await a1.myFetch(methodObject.apiRoot + '/' + methodObject.url, { method: methodObject.verb });
    /** Get Account Doc provisionerAccounts.get */
    methodObject = apiGen.getAPI('provisionerAccounts.get', { accountId: a1.accountId, resellerId: a1.resellerId, apiProvisionRoot: a1.apiProvisionRoot });
    res = await a1.myFetch(methodObject.apiRoot + '/' + methodObject.url, { method: methodObject.verb });
    console.log(res);
    /** Get Device list provisionerDevices.list */
    methodObject = apiGen.getAPI('provisionerDevices.list', { accountId: a1.accountId, resellerId: a1.resellerId, apiProvisionRoot: a1.apiProvisionRoot });
    res = await a1.myFetch(methodObject.apiRoot + '/' + methodObject.url, { method: methodObject.verb });
    console.log(res);
    /** Get Individual Device provisionerDevices.get */
    for (let device of res.data) {
        methodObject = apiGen.getAPI('provisionerDevices.get', { accountId: a1.accountId, resellerId: a1.resellerId, apiProvisionRoot: a1.apiProvisionRoot, macAddress: device.mac_address });
        res = await a1.myFetch(methodObject.apiRoot + '/' + methodObject.url, { method: methodObject.verb });
        console.log(res);
        /** Get Device Device Templates */
        methodObject = apiGen.getAPI('provisionerDevices.getTemplate', { accountId: a1.accountId, resellerId: a1.resellerId, apiProvisionRoot: a1.apiProvisionRoot, macAddress: device.mac_address, brand: res.data.brand, family: res.data.family, model: res.data.model });
        res = await a1.myFetch(methodObject.apiRoot + '/' + methodObject.url, { method: methodObject.verb });
        console.log(res);
        /** Get Device Raw Config Files */
        methodObject = apiGen.getAPI('provisionerDevices.getConfigFiles', { accountId: a1.accountId, resellerId: a1.resellerId, apiProvisionRoot: a1.apiProvisionRoot, macAddress: device.mac_address, brand: res.data.brand, family: res.data.family, model: res.data.model });
        res = await a1.myFetch(methodObject.apiRoot + '/' + methodObject.url, { method: methodObject.verb });
        console.log(res);
    }

    return res;
}

async function getVoicemailData(a1) {
    let apiGen = new APIGenerator();
    let methodObject, res, resVMBox, resMsg, resMsgList, resMsgAttachment;
    methodObject = apiGen.getAPI('voicemail.list', { accountId: a1.accountId, resellerId: a1.resellerId, apiProvisionRoot: a1.apiProvisionRoot });
    res = await a1.myFetch(a1.apiRoot + '/' + methodObject.url, { method: methodObject.verb });
    console.log(res);

    for (let vmbox of res.data) {
        methodObject = apiGen.getAPI('voicemail.get', { accountId: a1.accountId, resellerId: a1.resellerId, apiProvisionRoot: a1.apiProvisionRoot, voicemailId: vmbox.id });
        resVMBox = await a1.myFetch(a1.apiRoot + '/' + methodObject.url, { method: methodObject.verb });
        console.log(resVMBox);
        fileWrite(dataDir + '/' + a1.accountId + '/voicemail/' + vmbox.id + '/' + vmbox.id, JSON.stringify(vmbox))

        methodObject = apiGen.getAPI('voicemail.listMessages', { accountId: a1.accountId, resellerId: a1.resellerId, apiProvisionRoot: a1.apiProvisionRoot, voicemailId: vmbox.id });
        resMsgList = await a1.myFetch(a1.apiRoot + '/' + methodObject.url, { method: methodObject.verb });
        console.log(resMsgList);

        for(let msg of resMsgList.data) {
            if(msg.folder === 'deleted') {
                continue;
            }
            methodObject = apiGen.getAPI('voicemail.getMessages', { accountId: a1.accountId, resellerId: a1.resellerId, apiProvisionRoot: a1.apiProvisionRoot, voicemailId: vmbox.id, msgId: msg.media_id });
            console.log(methodObject);
            resMsg = await a1.myFetch(a1.apiRoot + '/' + methodObject.url, { method: methodObject.verb });
            console.log(resMsg);
            fileWrite(dataDir + '/' + a1.accountId + '/voicemail/' + vmbox.id + '/messages/' + msg.media_id, JSON.stringify(msg));
            /** Get Attachment */
            methodObject = apiGen.getAPI('voicemail.getAttachment', { accountId: a1.accountId, resellerId: a1.resellerId, apiProvisionRoot: a1.apiProvisionRoot, voicemailId: vmbox.id, msgId: msg.media_id });
            resMsgAttachment = await a1.myFetch(a1.apiRoot + '/' + methodObject.url, { responseType: 'arrayBuffer', method: methodObject.verb });
            fileWrite(dataDir + '/' + a1.accountId + '/voicemail/' + vmbox.id + '/messages/' + msg.media_id + '.mp3', resMsgAttachment);
        }
    }
}

async function getMediaData(a1) {

}

main();
//let accountDestination = new AccountMigration(username, password, accountName, portalURL, apiRoot, apiProvisionRoot);