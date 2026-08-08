#!/bin/bash
echo "domain,record_type,ip" > V8_WAVE5R2_DNS_ORIGIN_MATRIX.csv
echo "animaparty.ro,A,$(dig +short animaparty.ro A)" >> V8_WAVE5R2_DNS_ORIGIN_MATRIX.csv
echo "animaparty.ro,AAAA,$(dig +short animaparty.ro AAAA)" >> V8_WAVE5R2_DNS_ORIGIN_MATRIX.csv
echo "www.animaparty.ro,A,$(dig +short www.animaparty.ro A)" >> V8_WAVE5R2_DNS_ORIGIN_MATRIX.csv
echo "www.animaparty.ro,AAAA,$(dig +short www.animaparty.ro AAAA)" >> V8_WAVE5R2_DNS_ORIGIN_MATRIX.csv
cat V8_WAVE5R2_DNS_ORIGIN_MATRIX.csv
