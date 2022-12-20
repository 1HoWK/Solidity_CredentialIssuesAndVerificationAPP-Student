// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

contract CredentialsFactory {
    address[] public deployedCertificates;
    address[] public deployedBadges;

    function createCertificate(
        string memory title,
        string memory description,
        string memory dateIssued
    ) public {
        address newCertificate = new Certificate(
            title,
            description,
            dateIssued,
            msg.sender
        );

        deployedCertificates.push(newCertificate);
    }

    function getDeployedCertificates() public view returns (address[]) {
        return deployedCertificates;
    }

    function createBadge(
        string memory title,
        string memory description,
        string memory dateIssued
    ) public {
        address newBadge = new Badge(
            title,
            description,
            dateIssued,
            msg.sender
        );

        deployedBadges.push(newBadge);
    }

    function getDeployedBadges() public view returns (address[]) {
        return deployedBadges;
    }
}

contract Certificate {
    address public manager;
    string public title;
    string public description;
    string public dateIssued;

    function Certificate(
        string memory _title,
        string memory _description,
        string memory _dateIssued,
        address _creator
    ) public {
        manager = _creator;
        title = _title;
        description = _description;
        dateIssued = _dateIssued;
    }
}

contract Badge {
    address public manager;
    string public title;
    string public description;
    string public dateIssued;

    function Badge(
        string memory _title,
        string memory _description,
        string memory _dateIssued,
        address _creator
    ) public {
        manager = _creator;
        title = _title;
        description = _description;
        dateIssued = _dateIssued;
    }
}
