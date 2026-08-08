const fs = require('fs');

const inventory = `service_id,service_name,currently_offered,business_evidence,current_public_url,historical_url,price_available,price_verified,Bucuresti_available,Ilfov_available,transport_rule,photos_available,real_event_evidence_available,reviews_available,query_demand_detected,proposed_target_url,release_status
1,Animatori,YES,pricing.ts,https://animaparty.ro/animatori-petreceri-copii-bucuresti/,,YES,490 RON/2h,YES,YES,Gratuit Buc/Calculat Ilfov,YES,YES,NO,YES,https://animaparty.ro/,VERIFIED_ACTIVE
2,Mascote,YES,pricing.ts,,/mascote,YES,350 RON/1h,YES,YES,Gratuit Buc/Calculat Ilfov,YES,YES,NO,YES,https://animaparty.ro/mascote-petreceri-copii-bucuresti/,SEO_CANDIDATE
3,Animatori pe Picioroange,YES,pricing.ts,,,YES,1450 RON/1h,YES,YES,Gratuit Buc/Calculat Ilfov,NO,NO,NO,YES,https://animaparty.ro/animatori-pe-picioroange/,SEO_CANDIDATE
4,Balloon Exploder,YES,pricing.ts,,,YES,La cerere,YES,YES,Gratuit Buc/Calculat Ilfov,NO,NO,NO,YES,,MERGE_WITH_EXISTING_PAGE
5,Piñata,YES,pricing.ts,,,YES,La cerere,YES,YES,Gratuit Buc/Calculat Ilfov,NO,NO,NO,YES,,MERGE_WITH_EXISTING_PAGE
6,Decor Baloane,NO,NONE,,,NO,NO,UNKNOWN,UNKNOWN,UNKNOWN,NO,NO,NO,YES,,HOLD
7,Baloane cu heliu,NO,NONE,,,NO,NO,UNKNOWN,UNKNOWN,UNKNOWN,NO,NO,NO,YES,,HOLD
8,Arcade baloane,NO,NONE,,,NO,NO,UNKNOWN,UNKNOWN,UNKNOWN,NO,NO,NO,YES,,HOLD
9,Vata de zahar,NO,NONE,,,NO,NO,UNKNOWN,UNKNOWN,UNKNOWN,NO,NO,NO,YES,,HOLD
10,Popcorn,NO,NONE,,,NO,NO,UNKNOWN,UNKNOWN,UNKNOWN,NO,NO,NO,YES,,HOLD
11,Magician,NO,NONE,,,NO,NO,UNKNOWN,UNKNOWN,UNKNOWN,NO,NO,NO,YES,,HOLD
12,Mos Craciun,NO,NONE,,,NO,NO,UNKNOWN,UNKNOWN,UNKNOWN,NO,NO,NO,YES,,HOLD
13,Ursitoare botez,NO,NONE,,,NO,NO,UNKNOWN,UNKNOWN,UNKNOWN,NO,NO,NO,YES,,HOLD
`;
fs.writeFileSync('v8_artifacts/V8_MASTER_SERVICE_INVENTORY.csv', inventory);

const queryUniverse = `query,normalized_query,service_cluster,intent,geo,commercial_value,existing_target_url,potential_new_url,GSC_clicks,GSC_impressions,GSC_position,Google_observed_position,SERP_overlap_cluster,page_required,priority
animatori petreceri copii,animatori petreceri copii,animators,commercial,National,HIGH,https://animaparty.ro/,,0,0,0,NOT_IN_TOP10,animators,NO,P0
animatori petreceri copii Bucuresti,animatori petreceri copii bucuresti,animators,local commercial,Bucuresti,HIGH,https://animaparty.ro/animatori-petreceri-copii-bucuresti/,,0,0,0,NOT_IN_TOP10,animators,NO,P0
animatori petreceri copii Ilfov,animatori petreceri copii ilfov,animators,local commercial,Ilfov,HIGH,https://animaparty.ro/animatori-petreceri-copii-ilfov/,,0,0,0,NOT_IN_TOP10,animators,NO,P0
mascote petreceri copii Bucuresti,mascote petreceri copii bucuresti,mascote,local commercial,Bucuresti,MEDIUM,,https://animaparty.ro/mascote-petreceri-copii-bucuresti/,0,0,0,NOT_IN_TOP10,mascote,YES,P1
inchiriere mascote copii,inchiriere mascote copii,mascote,commercial,National,MEDIUM,,https://animaparty.ro/mascote-petreceri-copii-bucuresti/,0,0,0,NOT_IN_TOP10,mascote,YES,P1
animatori pe picioroange,animatori pe picioroange,picioroange,commercial,National,MEDIUM,,https://animaparty.ro/animatori-pe-picioroange/,0,0,0,NOT_IN_TOP10,picioroange,YES,P2
decoratiuni baloane Bucuresti,decoratiuni baloane bucuresti,decor,local commercial,Bucuresti,HIGH,,,0,0,0,NOT_IN_TOP10,decor,HOLD,HOLD
`;
fs.writeFileSync('v8_artifacts/V8_MASTER_QUERY_UNIVERSE.csv', queryUniverse);

console.log('Inventories created');
