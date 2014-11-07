barebones-node-www
==================

Simple structure for running a base webserver in nodejs.  Includes module handling sample with requires.
A post sample with a custom handler 'message' to illustrate dynamic content filling.

Usage:

nodejs index.js <port>

Where <port> is a network port of your choice

The sampleinit.conf file is a template for start/stop of the web site as a service.  This is placed
in /etc/init directory on debian/ubuntu.
