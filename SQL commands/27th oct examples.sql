SELECT * 
FROM sensordata 
WHERE "timestamp" BETWEEN '2023-10-27 18:00:00' AND '2023-10-27 18:10:00' 
ORDER BY "timestamp" DESC;


SELECT * 
FROM sensordata
ORDER BY "timestamp" ASC;