module.exports = {
	tables: [{
		TableName: "carts-table",
		KeySchema: [{
			AttributeName: "id",
			KeyType: "HASH"
		}],
		AttributeDefinitions: [{
			AttributeName: "id",
			AttributeType: "S"
		}],
		BillingMode: 'PAY_PER_REQUEST'
	}, {
		TableName: "products-table",
		KeySchema: [{
			AttributeName: "id",
			KeyType: "HASH"
		}],
		AttributeDefinitions: [{
			AttributeName: "id",
			AttributeType: "S"
		}],
		BillingMode: 'PAY_PER_REQUEST'
	}]
}