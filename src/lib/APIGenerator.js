export class APIGenerator {

    getAPI(resource, options = {}) {
		let [res, method] = resource.split('.');
		
        let methodsGenerator = {
			system: {
				'dialplans': { verb: 'GET', url: `accounts/${options.accountId}/dialplans` },
				'about': { verb: 'GET', url: `about` }
			},
			accessLists: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/access_lists` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/access_lists` }
			},
			account: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}` },
				'patch': { verb: 'PATCH', url: `accounts/${options.accountId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}` },
				'listDescendants': { verb: 'GET', url: `accounts/${options.accountId}/descendants` },
				'listChildren': { verb: 'GET', url: `accounts/${options.accountId}/children?ascending=true` },
				'listParents': { verb: 'GET', url: `accounts/${options.accountId}/tree` },
				'searchByName': { verb: 'GET', url: `search?t=account&q=name&v=${options.accountName}` },
				'searchAll': { verb: 'GET', url: `search/multi?t=account&by_name=${options.searchValue}&by_realm=${options.searchValue}&by_id=${options.searchValue}` },
				'promote': { verb: 'PUT', url: `accounts/${options.accountId}/reseller` },
				'demote': { verb: 'DELETE', url: `accounts/${options.accountId}/reseller` }
			},
			alert: {
				'list': { verb: 'GET', url: `accounts/${options.accountId}/alerts` }
			},
			apiKey: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/api_key` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/api_key` }
			},
			appsStore: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/apps_store/${options.appId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/apps_store` },
				'getIcon': { verb: 'GET', url: `accounts/${options.accountId}/apps_store/${options.appId}/icon', dataType: 'text` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/apps_store/${options.appId}` },
				'add': { verb: 'PUT', url: `accounts/${options.accountId}/apps_store/${options.appId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/apps_store/${options.appId}` },
				'getBlacklist': { verb: 'GET', url: `accounts/${options.accountId}/apps_store/blacklist` },
				'updateBlacklist': { verb: 'POST', url: `accounts/${options.accountId}/apps_store/blacklist` },
				'updateIcon': { verb: 'POST', url: `accounts/${options.accountId}/apps_store/${options.appId}/override/icon` },
				'getOverride': { verb: 'GET', url: `accounts/${options.accountId}/apps_store/${options.appId}/override` },
				'createOverride': { verb: 'PUT', url: `accounts/${options.accountId}/apps_store/${options.appId}/override` },
				'updateOverride': { verb: 'POST', url: `accounts/${options.accountId}/apps_store/${options.appId}/override` },
				'deleteOverride': { verb: 'DELETE', url: `accounts/${options.accountId}/apps_store/${options.appId}/override` }
			},
			auth: {
				'get': { verb: 'GET', url: `auth/tokeninfo?token=${options.token}`, removeHeaders: ['X-Auth-Token'] },
				'postTokenInfo': { verb: 'POST', url: `auth/tokeninfo`, removeHeaders: ['X-Auth-Token'] },
				'recovery': { verb: 'PUT', url: `user_auth/recovery` },
				'recoveryResetId': { verb: 'POST', url: `user_auth/recovery` },
				'link': { verb: 'PUT', url: `auth/links/${options.auth_id}` },
				'unlink': { verb: 'DELETE', url: `auth/links/${options.auth_id}` },
				'getLink': { verb: 'GET', url: `accounts/${options.accountId}/auth/links/${options.auth_id}` },
				'impersonate': { verb: 'PUT', url: `accounts/${options.accountId}/users/${options.userId}/user_auth` }
			},
			billing: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/braintree/customer` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/braintree/customer` }
			},
			blacklist: {
				'list': { verb: 'GET', url: `accounts/${options.accountId}/blacklists` },
				'get': { verb: 'GET', url: `accounts/${options.accountId}/blacklists/${options.blacklistId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/blacklists` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/blacklists/${options.blacklistId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/blacklists/${options.blacklistId}` }
			},
			callflow: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/callflows/${options.callflowId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/callflows` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/callflows/${options.callflowId}` },
				'patch': { verb: 'PATCH', url: `accounts/${options.accountId}/callflows/${options.callflowId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/callflows/${options.callflowId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/callflows` },
				'searchByNameAndNumber': { verb: 'GET', url: `accounts/${options.accountId}/search?t=callflow&q=name_and_number&v=${options.value}` },
				'searchByNumber': { verb: 'GET', url: `accounts/${options.accountId}/search?t=callflow&q=number&v=${options.value}` }
			},
			cdrs: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/cdrs/${options.cdrId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/cdrs` },
				'listByInteractionUser': { verb: 'GET', url: `accounts/${options.accountId}/users/${options.userId}/cdrs/interaction` },
				'listByUser': { verb: 'GET', url: `accounts/${options.accountId}/users/${options.userId}/cdrs` },
				'listByInteraction': { verb: 'GET', url: `accounts/${options.accountId}/cdrs/interaction` },
				'listLegs': { verb: 'GET', url: `accounts/${options.accountId}/cdrs/legs/${options.callId}` }
			},
			cdrPushOnebill: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/cdr_push_onebill` },
				'post': { verb: 'POST', url: `accounts/${options.accountId}/cdr_push_onebill` }
			},
			channel: {
				'list': { verb: 'GET', url: `accounts/${options.accountId}/channels` },
				'action': { verb: 'PUT', url: `accounts/${options.accountId}/channels/${options.callId}`, removeMetadataAPI: true }
			},
			clickToCall: {
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/clicktocall` },
				'get': { verb: 'GET', url: `accounts/${options.accountId}/clicktocall/${options.clickToCallId}` },
				'update': { verb: 'GET', url: `accounts/${options.accountId}/clicktocall/${options.clickToCallId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/clicktocall/${options.clickToCallId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/clicktocall` },
				'connect': { verb: 'POST', url: `accounts/${options.accountId}/clicktocall/${options.clickToCallId}/connect` }
			},
			conference: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/conferences/${options.conferenceId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/conferences` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/conferences/${options.conferenceId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/conferences/${options.conferenceId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/conferences` },
				'action': { verb: 'PUT', url: `accounts/${options.accountId}/conferences/${options.conferenceId}` },
				'participantsList': { verb: 'GET', url: `accounts/${options.accountId}/conferences/${options.conferenceId}/participants` },
				'participantsBulkAction': { verb: 'PUT', url: `accounts/${options.accountId}/conferences/${options.conferenceId}/participants` },
				'participantsAction': { verb: 'PUT', url: `accounts/${options.accountId}/conferences/${options.conferenceId}/participants/${options.participantId}` }
			},
			connectivity: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/connectivity/${options.connectivityId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/connectivity` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/connectivity/${options.connectivityId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/connectivity` }
			},
			contactList: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/contact_list` }
			},
			crm: {
				'getIntegration': { verb: 'GET', url: `accounts/${options.accountId}/crm_integration` },
				'createIntegration': { verb: 'PUT', url: `accounts/${options.accountId}/crm_integration` },
				'getTrigger': { verb: 'GET', url: `accounts/${options.accountId}/crm_integration/triggers/${options.triggerId}` },
				'listTriggers': { verb: 'GET', url: `accounts/${options.accountId}/crm_integration/triggers` },
				'createTrigger': { verb: 'PUT', url: `accounts/${options.accountId}/crm_integration/triggers` },
				'updateTrigger': { verb: 'POST', url: `accounts/${options.accountId}/crm_integration/triggers/${options.triggerId}` },
				'patchTrigger': { verb: 'PATCH', url: `accounts/${options.accountId}/crm_integration/triggers/${options.triggerId}` },
				'deleteTrigger': { verb: 'DELETE', url: `accounts/${options.accountId}/crm_integration/triggers/${options.triggerId}` },
				'listMappings': { verb: 'GET', url: `accounts/${options.accountId}/crm_integration/mappings` },
				'getMapping': { verb: 'GET', url: `accounts/${options.accountId}/crm_integration/mappings/${options.mappingId}` },
				'createMapping': { verb: 'PUT', url: `accounts/${options.accountId}/crm_integration/mappings` },
				'updateMapping': { verb: 'POST', url: `accounts/${options.accountId}/crm_integration/mappings/${options.mappingId}` },
				'patchMapping': { verb: 'PATCH', url: `accounts/${options.accountId}/crm_integration/mappings/${options.mappingId}` },
				'deleteMapping': { verb: 'DELETE', url: `accounts/${options.accountId}/crm_integration/mappings/${options.mappingId}` },
				'getCallLog': { verb: 'GET', url: `accounts/${options.accountId}/crm_integration/call_logs` }
			},
			dashboards: {
				'getEnsureStarted': { verb: 'GET', url: `accounts/${options.accountId}/dashboards/ensure_started` },
				'getQueueDetails': { verb: 'POST', url: `accounts/${options.accountId}/dashboards/queue_details/${options.queueId}` },
				'getQueueOverview': { verb: 'POST', url: `accounts/${options.accountId}/dashboards/queue_overview` },
				'getRecipientOverview': { verb: 'GET', url: `accounts/${options.accountId}/dashboards/recipient_overview` },
				'getRecipientPerformance': { verb: 'GET', url: `accounts/${options.accountId}/dashboards/recipient_performance` },
				'getActivityLog': { verb: 'POST', url: `accounts/${options.accountId}/dashboards/activity_log` }
			},
			desktop: {
				'getWindows': { verb: 'GET', url: `accounts/${options.accountId}/desktop/windows` },
				'getMac': { verb: 'GET', url: `accounts/${options.accountId}/desktop/mac` },
				'getLinux': { verb: 'GET', url: `accounts/${options.accountId}/desktop/linux` }
			},
			device: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/devices/${options.deviceId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/devices` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/devices/${options.deviceId}` },
				'patch': { verb: 'PATCH', url: `accounts/${options.accountId}/devices/${options.deviceId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/devices/${options.deviceId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/devices` },
				'getStatus': { verb: 'GET', url: `accounts/${options.accountId}/devices/status` },
				'quickcall': { verb: 'GET', url: `accounts/${options.accountId}/devices/${options.deviceId}/quickcall/${options.number}` },
				'restart': { verb: 'POST', url: `accounts/${options.accountId}/devices/${options.deviceId}/sync` },
				'updatePresence': { verb: 'POST', url: `accounts/${options.accountId}/device/${options.deviceId}/presence` }
			},
			directory: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/directories/${options.directoryId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/directories` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/directories/${options.directoryId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/directories/${options.directoryId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/directories` }
			},
			externalNumbers: {
				get: { verb: 'GET', url: `accounts/${options.accountId}/external_numbers/${options.numberId}` },
				create: { verb: 'PUT', url: `accounts/${options.accountId}/external_numbers` },
				delete: { verb: 'DELETE', url: `accounts/${options.accountId}/external_numbers/${options.numberId}` },
				list: { verb: 'GET', url: `accounts/${options.accountId}/external_numbers` },
				verify: { verb: 'PUT', url: `accounts/${options.accountId}/external_numbers/${options.numberId}/verify` },
				submitPin: { verb: 'POST', url: `accounts/${options.accountId}/external_numbers/${options.numberId}/verify` }
			},
			faxbox: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/faxboxes/${options.faxboxId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/faxboxes` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/faxboxes/${options.faxboxId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/faxboxes/${options.faxboxId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/faxboxes` }
			},
			smtpLogs: {
				'list': { verb: 'GET', url: `accounts/${options.accountId}/notifications/smtplog` },
				'get': { verb: 'GET', url: `accounts/${options.accountId}/notifications/smtplog/${options.logId}` }
			},
			faxes: {
				'send': { verb: 'PUT', url: `accounts/${options.accountId}/faxes` },
				'sendAsMultipart': { verb: 'PUT', url: `accounts/${options.accountId}/faxes', type: 'multipart/mixed` },

				'getLogs': { verb: 'GET', url: `accounts/${options.accountId}/faxes/smtplog` },
				'getLogDetails': { verb: 'GET', url: `accounts/${options.accountId}/faxes/smtplog/${options.logId}` },

				'listInbound': { verb: 'GET', url: `accounts/${options.accountId}/faxes/inbox` },
				'getDetailsInbound': { verb: 'GET', url: `accounts/${options.accountId}/faxes/inbox/${options.faxId}` },
				'getAttachmentInbound': { verb: 'GET', url: `accounts/${options.accountId}/faxes/inbox/${options.faxId}/attachment', dataType: 'text` },
				'updateInbound': { verb: 'PUT', url: `accounts/${options.accountId}/faxes/inbox/${options.faxId}` },
				'deleteInbound': { verb: 'DELETE', url: `accounts/${options.accountId}/faxes/inbox/${options.faxId}` },

				'listOutbound': { verb: 'GET', url: `accounts/${options.accountId}/faxes/outbox` },
				'getDetailsOutbound': { verb: 'GET', url: `accounts/${options.accountId}/faxes/outbox/${options.faxId}` },
				'getAttachmentOutbound': { verb: 'GET', url: `accounts/${options.accountId}/faxes/outbox/${options.faxId}/attachment', dataType: 'text` },
				'updateOutbound': { verb: 'PUT', url: `accounts/${options.accountId}/faxes/outbox/${options.faxId}` },
				'deleteOutbound': { verb: 'DELETE', url: `accounts/${options.accountId}/faxes/outbox/${options.faxId}` }
			},
			globalResources: {
				'get': { verb: 'GET', url: `resources/${options.resourceId}` },
				'create': { verb: 'PUT', url: `resources` },
				'update': { verb: 'POST', url: `resources/${options.resourceId}` },
				'delete': { verb: 'DELETE', url: `resources/${options.resourceId}` },
				'list': { verb: 'GET', url: `resources` },
				'updateCollection': { verb: 'POST', url: `resources/collection` },
				'listJobs': { verb: 'GET', url: `resources/jobs` },
				'getJob': { verb: 'GET', url: `resources/jobs/${options.jobId}` },
				'createJob': { verb: 'PUT', url: `resources/jobs` }
			},
			group: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/groups/${options.groupId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/groups` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/groups/${options.groupId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/groups/${options.groupId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/groups` }
			},
			inspector: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/call_inspector/${options.callId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/call_inspector` }
			},
			ips: {
				'add': { verb: 'POST', url: `accounts/${options.accountId}/ips/${options.ip}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/ips/${options.ip}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/ips?zone=${options.zone}&quantity=${options.quantity}` },
				'listAssigned': { verb: 'GET', url: `accounts/${options.accountId}/ips/assigned` },
				'listZones': { verb: 'GET', url: `accounts/${options.accountId}/ips/zones` }
			},
			ledgers: {
				'list': { verb: 'GET', url: `accounts/${options.accountId}/ledgers` },
				'get': { verb: 'GET', url: `accounts/${options.accountId}/ledgers/${options.ledgerId}` },
				'getDetails': { verb: 'GET', url: `accounts/${options.accountId}/ledgers/${options.ledgerId}/${options.id}` },
				'listAvailable': { verb: 'GET', url: `accounts/${options.accountId}/ledgers/available` },
				'total': { verb: 'GET', url: `accounts/${options.accountId}/ledgers/total` },
				'credit': { verb: 'PUT', url: `accounts/${options.accountId}/ledgers/credit` },
				'debit': { verb: 'PUT', url: `accounts/${options.accountId}/ledgers/debit` },
				'summaryPerMonth': { verb: 'GET', url: `accounts/${options.accountId}/ledgers/summary/${options.modbSuffix}` }
			},
			limits: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/limits` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/limits` }
			},
			localResources: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/resources/${options.resourceId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/resources` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/resources/${options.resourceId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/resources/${options.resourceId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/resources` },
				'updateCollection': { verb: 'POST', url: `accounts/${options.accountId}/resources/collection` },
				'listJobs': { verb: 'GET', url: `accounts/${options.accountId}/resources/jobs` },
				'getJob': { verb: 'GET', url: `accounts/${options.accountId}/resources/jobs/${options.jobId}` },
				'createJob': { verb: 'PUT', url: `accounts/${options.accountId}/resources/jobs` }
			},
			media: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/media/${options.mediaId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/media` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/media/${options.mediaId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/media/${options.mediaId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/media` },
				'upload': { verb: 'POST', url: `accounts/${options.accountId}/media/${options.mediaId}/raw', type: 'application/x-base64` }
			},
			menu: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/menus/${options.menuId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/menus` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/menus/${options.menuId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/menus/${options.menuId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/menus` }
			},
			metaflow: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/metaflows` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/metaflows` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/metaflows` }
			},
			multifactor: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/multi_factor/${options.mfaId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/multi_factor` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/multi_factor/${options.mfaId}` },
				'patch': { verb: 'PATCH', url: `accounts/${options.accountId}/multi_factor/${options.mfaId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/multi_factor/${options.mfaId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/multi_factor` },
				'listAttempts': { verb: 'GET', url: `accounts/${options.accountId}/multi_factor/attempts` },
				'getAttempt': { verb: 'GET', url: `accounts/${options.accountId}/multi_factor/attempts/${options.attemptId}` }
			},
			numbers: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/phone_numbers/${options.phoneNumber}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/phone_numbers/${options.phoneNumber}` },
				'createBlock': { verb: 'PUT', url: `accounts/${options.accountId}/phone_numbers/collection` },
				'activate': { verb: 'PUT', url: `accounts/${options.accountId}/phone_numbers/${options.phoneNumber}/activate` },
				'activateBlock': { verb: 'PUT', url: `accounts/${options.accountId}/phone_numbers/collection/activate` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/phone_numbers/${options.phoneNumber}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/phone_numbers/${options.phoneNumber}` },
				'deleteBlock': { verb: 'DELETE', url: `accounts/${options.accountId}/phone_numbers/collection` },
				'identify': { verb: 'GET', url: `accounts/${options.accountId}/phone_numbers/${options.phoneNumber}/identify` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/phone_numbers?filter_state=` + encodeURIComponent('["in_service","port_in"]') },
				'listAll': { verb: 'GET', url: `accounts/${options.accountId}/phone_numbers` },
				'listClassifiers': { verb: 'GET', url: `accounts/${options.accountId}/phone_numbers/classifiers` },
				'matchClassifier': { verb: 'GET', url: `accounts/${options.accountId}/phone_numbers/classifiers/${options.phoneNumber}` },
				'search': { verb: 'GET', url: `accounts/${options.accountId}/phone_numbers?prefix=${options.pattern}&quantity=${options.limit}&offset=${options.offset}` },
				'searchBlocks': { verb: 'GET', url: `accounts/${options.accountId}/phone_numbers?prefix=${options.pattern}&quantity=${options.size}&offset=${options.offset}&blocks=${options.limit}` },
				'searchCity': { verb: 'GET', url: `accounts/${options.accountId}/phone_numbers/prefix?city=${options.city}` },
				'sync': { verb: 'POST', url: `accounts/${options.accountId}/phone_numbers/fix` },
				'syncOne': { verb: 'POST', url: `accounts/${options.accountId}/phone_numbers/fix/${options.number}` },
				'getCarrierInfo': { verb: 'GET', url: `accounts/${options.accountId}/phone_numbers/carriers_info` },
				'patch': { verb: 'PATCH', url: `accounts/${options.accountId}/phone_numbers/${options.phoneNumber}` }
			},
			parkedCalls: {
				'list': { verb: 'GET', url: `accounts/${options.accountId}/parked_calls` }
			},
			pivot: {
				'listDebug': { verb: 'GET', url: `accounts/${options.accountId}/pivot/debug` },
				'getDebug': { verb: 'GET', url: `accounts/${options.accountId}/pivot/debug/${options.callId}` }
			},
			port: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/port_requests` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/port_requests` },
				'listByState': { verb: 'GET', url: `accounts/${options.accountId}/port_requests/${options.state}` },
				'listDescendants': { verb: 'GET', url: `accounts/${options.accountId}/descendants/port_requests` },
				'listDescendantsByState': { verb: 'GET', url: `accounts/${options.accountId}/descendants/port_requests/${options.state}` },
				'listAttachments': { verb: 'GET', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/attachments` },
				'getAttachment': { verb: 'GET', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/attachments/${options.documentName}', dataType: 'text` },
				'createAttachment': { verb: 'PUT', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/attachments?filename=${options.documentName}', type: 'application/pdf` },
				'updateAttachment': { verb: 'POST', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/attachments/${options.documentName}', type: 'application/pdf` },
				'deleteAttachment': { verb: 'DELETE', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/attachments/${options.documentName}` },
				'changeState': { verb: 'PATCH', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/${options.state}` },
				'listComments': { verb: 'GET', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/comments` },
				'getComment': { verb: 'GET', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/comments/${options.commentId}` },
				'addComment': { verb: 'PUT', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/comments` },
				'updateComment': { verb: 'POST', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/comments/${options.commentId}` },
				'deleteComment': { verb: 'DELETE', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/comments/${options.commentId}` },
				'deleteAllComments': { verb: 'DELETE', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/comments` },
				'getTimeline': { verb: 'GET', url: `accounts/${options.accountId}/port_requests/${options.portRequestId}/timeline` },
				'listLastSubmitted': { verb: 'GET', url: `accounts/${options.accountId}/port_requests/last_submitted` },
				'searchNumber': { verb: 'GET', url: `accounts/${options.accountId}/port_requests?by_number=${options.number}` },
				'searchNumberByDescendants': { verb: 'GET', url: `accounts/${options.accountId}/descendants/port_requests?by_number=${options.number}` },
				'portabilityLookup': { verb: 'POST', url: `accounts/${options.accountId}/port_requests/lnp_lookup` },
				'listPortAuthority': { verb: 'GET', url: `port_requests` }
			},
			presence: {
				'list': { verb: 'GET', url: `accounts/${options.accountId}/presence` },
				'get': { verb: 'GET', url: `accounts/${options.accountId}/presence/${options.presenceId}` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/presence/${options.presenceId}` }
			},
			provisionerDevices: {
				'get': { apiRoot: options.apiProvisionRoot, url: `devices/${options.accountId}/${options.macAddress}`, verb: "GET" },
				'list': { apiRoot: options.apiProvisionRoot, url: `devices/${options.accountId}`, verb: "GET" },
				'create': { apiRoot: options.apiProvisionRoot, url: `devices/${options.accountId}/${options.macAddress}`, verb: "PUT" },
				'update': { apiRoot: options.apiProvisionRoot, url: `devices/${options.accountId}/${options.macAddress}`, verb: "POST" },
				'delete': { apiRoot: options.apiProvisionRoot, url: `devices/${options.accountId}/${options.macAddress}`, verb: "DELETE" },
				'getTemplate': { apiRoot: options.apiProvisionRoot, url: `ui/${options.brand}/${options.family}/${options.model}`, verb: "GET" },
				'getConfigFiles': { apiRoot: options.apiProvisionRoot, url: `debug/accounts/${options.accountId}/device_config/${options.macAddress}`, verb: "GET" }
			},
			provisionerAccounts: {
				'get': { apiRoot: options.apiProvisionRoot, url: `accounts/${options.accountId}`, verb: "GET" },
				'update': { apiRoot: options.apiProvisionRoot, url: `accounts/${options.accountId}`, verb: "POST" },
				'getReseller': { apiRoot: options.apiProvisionRoot, url: `resellers/${options.resellerId}`, verb: "GET" }
			},
			qubicleQueues: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_queues/${options.queueId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/qubicle_queues` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_queues/${options.queueId}` },
				'patch': { verb: 'PATCH', url: `accounts/${options.accountId}/qubicle_queues/${options.queueId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/qubicle_queues/${options.queueId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_queues` },
				'listAllRecipients': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_queues/recipients` },
				'listRecipients': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_queues/${options.queueId}/recipients` },
				'updateRecipients': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_queues/${options.queueId}/recipients` },
				'deleteRecipients': { verb: 'DELETE', url: `accounts/${options.accountId}/qubicle_queues/${options.queueId}/recipients` },
				'getStatus': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_queues/${options.queueId}/status` },
				'listStatus': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_queues/status` },
				'updateRoles': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_queues/${options.queueId}/roles` },
				'updateSessions': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_queues/${options.queueId}/sessions/${options.sessionId}` },
				'getEnsureStarted': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_queues/ensure_started` }
			},
			qubicleRecipients: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_recipients/${options.userId}` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_recipients/${options.userId}` },
				'updateDisable': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_recipients/${options.userId}/disable` },
				'updateEnable': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_recipients/${options.userId}/enable` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_recipients` },
				'getStatus': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_recipients/${options.userId}/status` },
				'listStatus': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_recipients/status` },
				'updateStatus': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_recipients/${options.userId}/status` },
				'updateState': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_recipients/${options.userId}` },
				'updateRoles': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_recipients/${options.userId}/roles` },
				'getQueueMembership': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_recipients/queue_membership` }
			},
			qubicleRoles: {
				'list': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_roles` }
			},
			qubicleReports: {
				'get': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_reports` }
			},
			qubicleSkills: {
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/qubicle_skills/${options.skillId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/qubicle_skills` },
				'patch': { verb: 'PATCH', url: `accounts/${options.accountId}/qubicle_skills/${options.skillId}` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/qubicle_skills/${options.skillId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/qubicle_skills` }
			},
			recordings: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/recordings/${options.recordingId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/recordings/${options.resourceId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/recordings` }
			},
			registrations: {
				'list': { verb: 'GET', url: `accounts/${options.accountId}/registrations` }
			},
			resourceTemplates: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/resource_templates/${options.resourceId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/resource_templates` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/resource_templates/${options.resourceId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/resource_templates/${options.resourceId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/resource_templates` }
			},
			schemas: {
				'list': { verb: 'GET', url: `schemas` },
				'get': { verb: 'GET', url: `schemas/${options.schemaId}` }
			},
			security: {
				'listModules': { verb: 'GET', url: `security` },
				'get': { verb: 'GET', url: `accounts/${options.accountId}/security` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/security` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/security` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/security` },
				'listAttempts': { verb: 'GET', url: `accounts/${options.accountId}/security/attempts` },
				'getAttempt': { verb: 'GET', url: `accounts/${options.accountId}/security/attempts/${options.attemptId}` }
			},
			servicePlan: {
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/service_plans` },
				'get': { verb: 'GET', url: `accounts/${options.accountId}/service_plans/${options.planId}` },
				'add': { verb: 'POST', url: `accounts/${options.accountId}/service_plans/${options.planId}` },
				'addMany': { verb: 'POST', url: `accounts/${options.accountId}/service_plans/` },
				'remove': { verb: 'DELETE', url: `accounts/${options.accountId}/service_plans/${options.planId}` },
				'removeMany': { verb: 'DELETE', url: `accounts/${options.accountId}/service_plans/` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/service_plans/${options.planId}` },
				'addManyOverrides': { verb: 'POST', url: `accounts/${options.accountId}/service_plans/override` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/service_plans` },
				'listCurrent': { verb: 'GET', url: `accounts/${options.accountId}/service_plans/current` },
				'getCsv': { verb: 'GET', url: `accounts/${options.accountId}/service_plans/current?depth=4&identifier=items&accept=csv` },
				'listAvailable': { verb: 'GET', url: `accounts/${options.accountId}/service_plans/available` },
				'getAvailable': { verb: 'GET', url: `accounts/${options.accountId}/service_plans/available/${options.planId}` },
				'reconciliate': { verb: 'POST', url: `accounts/${options.accountId}/service_plans/reconciliation` },
				'synchronize': { verb: 'POST', url: `accounts/${options.accountId}/service_plans/synchronization` }
			},
			services: {
				'listAssigned': { verb: 'GET', url: `accounts/${options.accountId}/services` },
				'bulkChange': { verb: 'POST', url: `accounts/${options.accountId}/services/` },
				'getSummary': { verb: 'GET', url: `accounts/${options.accountId}/services/summary` },
				'getAuditSummary': { verb: 'GET', url: `accounts/${options.accountId}/services/audit_summary` },
				'listAvailable': { verb: 'GET', url: `accounts/${options.accountId}/services/available` },
				'quote': { verb: 'POST', url: `accounts/${options.accountId}/services/quote` },
				'topup': { verb: 'POST', url: `accounts/${options.accountId}/services/topup` },
				'listEditable': { verb: 'GET', url: `accounts/${options.accountId}/services/editable` },
				'listOverrides': { verb: 'GET', url: `accounts/${options.accountId}/services/overrides` },
				'updateManualQuantities': { verb: 'POST', url: `accounts/${options.accountId}/services/manual` }
			},
			slackIntegration: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/slack_integration` },
				'listUsers': { verb: 'GET', url: `accounts/${options.accountId}/slack_integration/user_listing` }
			},
			storage: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/storage` },
				'add': { verb: 'PUT', url: `accounts/${options.accountId}/storage` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/storage` },
				'patch': { verb: 'PATCH', url: `accounts/${options.accountId}/storage` }
			},
			tasks: {
				'summary': { verb: 'GET', url: `tasks` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/tasks` },
				'add': { verb: 'PUT', url: `accounts/${options.accountId}/tasks?category=${options.category}&action=${options.action}` },
				'get': { verb: 'GET', url: `accounts/${options.accountId}/tasks/${options.taskId}` },
				'start': { verb: 'PATCH', url: `accounts/${options.accountId}/tasks/${options.taskId}` },
				'stop': { verb: 'PATCH', url: `accounts/${options.accountId}/tasks/${options.taskId}/stop` },
				'getOutput': { verb: 'GET', url: `accounts/${options.accountId}/tasks/${options.taskId}/output', type: 'text/csv', dataType: 'text` },
				'getInput': { verb: 'GET', url: `accounts/${options.accountId}/tasks/${options.taskId}/input', type: 'text/csv', dataType: 'text` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/tasks/${options.taskId}` }
			},
			temporalRule: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/temporal_rules/${options.ruleId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/temporal_rules` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/temporal_rules/${options.ruleId}` },
				'patch': { verb: 'PATCH', url: `accounts/${options.accountId}/temporal_rules/${options.ruleId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/temporal_rules/${options.ruleId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/temporal_rules` }
			},
			temporalSet: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/temporal_rules_sets/${options.setId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/temporal_rules_sets` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/temporal_rules_sets/${options.setId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/temporal_rules_sets/${options.setId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/temporal_rules_sets` }
			},
			transactions: {
				'list': { verb: 'GET', url: `accounts/${options.accountId}/transactions` }
			},
			user: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/users/${options.userId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/users` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/users/${options.userId}` },
				'patch': { verb: 'PATCH', url: `accounts/${options.accountId}/users/${options.userId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/users/${options.userId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/users` },
				'quickcall': { verb: 'GET', url: `accounts/${options.accountId}/users/${options.userId}/quickcall/${options.number}` },
				'hotdesks': { verb: 'GET', url: `accounts/${options.accountId}/users/${options.userId}/hotdesks` },
				'updatePresence': { verb: 'POST', url: `accounts/${options.accountId}/users/${options.userId}/presence` },
				'listDevices': { verb: 'GET', url: `accounts/${options.accountId}/users/${options.userId}/devices` },
				'updateChatStatus': { verb: 'PATCH', url: `accounts/${options.accountId}/users/${options.userId}/getstream` },
				'listUsersWithChat': { verb: 'GET', url: `accounts/${options.accountId}/users/getstream` },
			},
			voicemail: {
				'get': { verb: 'GET', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/vmboxes` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}` },
				'patch': { verb: 'PATCH', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}` },
				'list': { verb: 'GET', url: `accounts/${options.accountId}/vmboxes` },
				'listMessages': { verb: 'GET', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}/messages` },
				'getMessages': { verb: 'GET', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}/messages/${options.msgId}` },
				'createMessages': { verb: 'PUT', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}/messages` },
				'updateMessages': { verb: 'POST', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}/messages` },
				'deleteMessages': { verb: 'DELETE', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}/messages` },
				'getAttachment': { verb: 'GET', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}/messages/${options.msgId}/raw` }
			},
			voicemailMessages: {
				'list': { verb: 'GET', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}/messages` },
				'get': { verb: 'GET', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}/messages/${options.msgId}` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}/messages` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}/messages` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/vmboxes/${options.voicemailId}/messages` }
			},
			webhooks: {
				'get': { 'verb': 'GET', url: `accounts/${options.accountId}/webhooks/${options.webhookId}` },
				'create': { 'verb': 'PUT', url: `accounts/${options.accountId}/webhooks` },
				'update': { 'verb': 'POST', url: `accounts/${options.accountId}/webhooks/${options.webhookId}` },
				'delete': { 'verb': 'DELETE', url: `accounts/${options.accountId}/webhooks/${options.webhookId}` },
				'list': { 'verb': 'GET', url: `accounts/${options.accountId}/webhooks` },
				'listAccountAttempts': { 'verb': 'GET', url: `accounts/${options.accountId}/webhooks/attempts` },
				'listAttempts': { 'verb': 'GET', url: `accounts/${options.accountId}/webhooks/${options.webhookId}/attempts` },
				'listAvailable': { 'verb': 'GET', url: `webhooks` },
				'patch': { 'verb': 'PATCH', url: `accounts/${options.accountId}/webhooks/${options.webhookId}` },
				'patchAll': { 'verb': 'PATCH', url: `accounts/${options.accountId}/webhooks` }
			},
			websockets: {
				'listEvents': { 'verb': 'GET', url: `websockets` },
				'list': { 'verb': 'GET', url: `accounts/${options.accountId}/websockets` },
				'listBindings': { 'verb': 'GET', url: `accounts/${options.accountId}/websockets/${options.websocketId}` }
			},
			whitelabel: {
				'getByDomain': { verb: 'GET', url: `whitelabel/${options.domain}` },
				'getLogoByDomain': { verb: 'GET', url: `whitelabel/${options.domain}/logo` },
				'getIconByDomain': { verb: 'GET', url: `whitelabel/${options.domain}/icon` },
				'getWelcomeByDomain': { verb: 'GET', url: `whitelabel/${options.domain}/welcome', type: 'text/html', dataType: 'html` },
				'get': { verb: 'GET', url: `accounts/${options.accountId}/whitelabel` },
				'getLogo': { verb: 'GET', url: `accounts/${options.accountId}/whitelabel/logo` },
				'getIcon': { verb: 'GET', url: `accounts/${options.accountId}/whitelabel/icon` },
				'getWelcome': { verb: 'GET', url: `accounts/${options.accountId}/whitelabel/welcome', type: 'text/html', dataType: 'html` },
				'update': { verb: 'POST', url: `accounts/${options.accountId}/whitelabel` },
				'updateLogo': { verb: 'POST', url: `accounts/${options.accountId}/whitelabel/logo', type: 'application/x-base64` },
				'updateIcon': { verb: 'POST', url: `accounts/${options.accountId}/whitelabel/icon', type: 'application/x-base64` },
				'updateWelcome': { verb: 'POST', url: `accounts/${options.accountId}/whitelabel/welcome', type: 'text/html', dataType: 'html` },
				'create': { verb: 'PUT', url: `accounts/${options.accountId}/whitelabel` },
				'delete': { verb: 'DELETE', url: `accounts/${options.accountId}/whitelabel` },
				'listNotifications': { verb: 'GET', url: `accounts/${options.accountId}/notifications` },
				'getSystemNotification': { verb: 'GET', url: `notifications/${options.notificationId}` },
				'getSystemNotificationText': { verb: 'GET', url: `notifications/${options.notificationId}', type: 'text/plain', dataType: 'text` },
				'getSystemNotificationHtml': { verb: 'GET', url: `notifications/${options.notificationId}', type: 'text/html', dataType: 'html` },
				'getNotification': { verb: 'GET', url: `accounts/${options.accountId}/notifications/${options.notificationId}` },
				'getNotificationText': { verb: 'GET', url: `accounts/${options.accountId}/notifications/${options.notificationId}', type: 'text/plain', dataType: 'text` },
				'getNotificationHtml': { verb: 'GET', url: `accounts/${options.accountId}/notifications/${options.notificationId}', type: 'text/html', dataType: 'html` },
				'updateNotification': { verb: 'POST', url: `accounts/${options.accountId}/notifications/${options.notificationId}` },
				'updateNotificationText': { verb: 'POST', url: `accounts/${options.accountId}/notifications/${options.notificationId}', type: 'text/plain', dataType: 'text` },
				'updateNotificationHtml': { verb: 'POST', url: `accounts/${options.accountId}/notifications/${options.notificationId}', type: 'text/html', dataType: 'html` },
				'previewNotification': { verb: 'POST', url: `accounts/${options.accountId}/notifications/${options.notificationId}/preview` },
				'deleteNotification': { verb: 'DELETE', url: `accounts/${options.accountId}/notifications/${options.notificationId}` },
				'getDnsEntries': { verb: 'GET', url: `accounts/${options.accountId}/whitelabel/domains` },
				'checkDnsEntries': { verb: 'POST', url: `accounts/${options.accountId}/whitelabel/domains?domain=${options.domain}&use_tcp=${options.useTcp}` }
			},
			matchList: {
				'list': { 'verb': 'GET', url: `accounts/${options.accountId}/match_lists/` },
				'create': { 'verb': 'PUT', url: `accounts/${options.accountId}/match_lists` },
				'get': { 'verb': 'GET', url: `accounts/${options.accountId}/match_lists/${options.matchListId}` },
				'update': { 'verb': 'POST', url: `accounts/${options.accountId}/match_lists/${options.matchListId}` },
				'patch': { 'verb': 'PATCH', url: `accounts/${options.accountId}/match_lists/${options.matchListId}` },
				'delete': { 'verb': 'DELETE', url: `accounts/${options.accountId}/match_lists/${options.matchListId}` }
			}
		}
	
		if(res === 'all') {
			return methodsGenerator;
		}
		if(methodsGenerator[res] && methodsGenerator[res][method]) {
			return methodsGenerator[res][method];
		} else {
			return '';
		}
    }
}
