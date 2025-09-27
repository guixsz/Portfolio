package com.example.portfolio.service;

import org.springframework.stereotype.Service;

import com.example.portfolio.dto.ClientRequest;
import com.example.portfolio.model.Client;
import com.example.portfolio.repository.ClientRepository;

@Service
public class ClientService {
    
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client createClient(ClientRequest clientRequest) {
        Client newClient = new Client(clientRequest);
        return clientRepository.save(newClient);
    }
}
