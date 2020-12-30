CREATE DEFINER=`root`@`localhost` TRIGGER `customers_customer_AFTER_UPDATE` AFTER UPDATE ON `customers_customer` FOR EACH ROW BEGIN
	IF OLD.name <> new.name THEN
        INSERT INTO customer.customers_customerchanges(customerID, fieldName, beforeField, afterField, username)
        VALUES(old.id, 'name', old.name, new.name, CURRENT_USER());
    END IF;
    IF OLD.telephone <> new.telephone THEN
        INSERT INTO customer.customers_customerchanges(customerID, fieldName, beforeField, afterField, username)
        VALUES(old.id, 'telephone', old.telephone, new.telephone, CURRENT_USER());
    END IF;
END