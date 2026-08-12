'use client';

import React, { useState, useEffect } from 'react';
import { Table, Chip, Card, Button } from '@heroui/react';
import { Person, TrashBin, PencilToLine, ArrowRotateRight, Shield } from '@gravity-ui/icons';

export default function ManageUsersClient() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:9000/api/users');
      if (!res.ok) {
        throw new Error('Failed to fetch users data');
      }
      const data = await res.json();
      // Adjust based on your API response structure (e.g. data.users or data)
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="w-full min-w-0 max-w-full overflow-x-hidden p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      
      {/* Header Section */}
      <header className="w-full min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-divider pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Person className="size-6 text-primary" /> Manage Users
          </h1>
          <p className="text-xs sm:text-sm text-default-500 mt-1">
            Control user permissions, view status, and manage active accounts.
          </p>
        </div>
        
        <Button 
          onPress={fetchUsers} 
          variant="flat" 
          color="primary" 
          size="sm"
          className="self-start sm:self-auto"
        >
          <ArrowRotateRight className="size-4" /> Refresh Data
        </Button>
      </header>

      {/* Main Table Card */}
      <Card shadow="sm" className="w-full min-w-0 border border-divider p-3 sm:p-5 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-default-500 text-sm">
            Loading users data...
          </div>
        ) : error ? (
          <div className="py-12 text-center text-danger text-sm">
            Error: {error}
          </div>
        ) : (
          <Table aria-label="Users Management Table">
            <Table.ScrollContainer>
              <Table.Content className="min-w-[700px]">
                <Table.Header>
                  <Table.Column isRowHeader>NAME</Table.Column>
                  <Table.Column>EMAIL</Table.Column>
                  <Table.Column>ROLE</Table.Column>
                  <Table.Column>STATUS</Table.Column>
                  <Table.Column className="text-right">ACTIONS</Table.Column>
                </Table.Header>
                <Table.Body emptyContent={"No users found."}>
                  {users.map((user) => (
                    <Table.Row key={user.id || user._id}>
                      {/* User Name */}
                      <Table.Cell>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                            {user.name ? user.name[0] : 'U'}
                          </div>
                          <span className="font-semibold text-foreground text-xs sm:text-sm">
                            {user.name || 'N/A'}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Email */}
                      <Table.Cell className="text-default-500 text-xs sm:text-sm">
                        {user.email}
                      </Table.Cell>

                      {/* Role */}
                      <Table.Cell>
                        <Chip 
                          size="sm" 
                          variant="soft" 
                          color={user.role === 'admin' ? 'primary' : 'default'}
                          className="capitalize text-xs"
                        >
                          {user.role === 'admin' && <Shield className="size-3 mr-1 inline" />}
                          {user.role || 'user'}
                        </Chip>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell>
                        <Chip 
                          size="sm" 
                          variant="flat" 
                          color={
                            user.status === 'active' || user.status === 'approved' 
                              ? 'success' 
                              : user.status === 'pending' 
                              ? 'warning' 
                              : 'danger'
                          }
                          className="capitalize text-xs"
                        >
                          {user.status || 'active'}
                        </Chip>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell>
                        <div className="flex items-center justify-end gap-1.5">
                          <Button 
                            isIconOnly 
                            size="sm" 
                            variant="light" 
                            color="default" 
                            aria-label="Edit user"
                          >
                            <PencilToLine className="size-4 text-default-600" />
                          </Button>
                          <Button 
                            isIconOnly 
                            size="sm" 
                            variant="light" 
                            color="danger" 
                            aria-label="Delete user"
                          >
                            <TrashBin className="size-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        )}
      </Card>

    </main>
  );
}