import json

# Load the JSON file
with open('rawPistachioOctober.json', 'r') as file:
    data = json.load(file)

# Function to summarize the data
def summarize_records(records):
    if len(records) == 0:
        return None

    # Initialize summary object
    summary = {
        "startDateTimeUtc": records[0]["startDateTimeUtc"],
        "endDateTimeUtc": records[-1]["endDateTimeUtc"],
        "returningUsers": 0,
        "newUsers": 0,
        "sessions": 0,
        "userMessages": 0,
        "botMessages": 0,
        "events": 0,
        "eventTypes": {
            "botready": 0,
            "botpublished": 0,
            "state_expired": 0,
            "webchat:conversationStarted": 0
        },
        "customEvents": {
            "Destination Guide User": 0,
            "Study Guide User": 0,
        },
        "messages": []
    }

    # Aggregate the data
    for record in records:
        summary["returningUsers"] += record.get("returningUsers", 0)
        summary["newUsers"] += record.get("newUsers", 0)
        summary["sessions"] += record.get("sessions", 0)
        summary["userMessages"] += record.get("userMessages", 0)
        summary["botMessages"] += record.get("botMessages", 0)
        summary["events"] += record.get("events", 0)

        # Aggregate event types
        for event_type in summary["eventTypes"]:
            summary["eventTypes"][event_type] += record["eventTypes"].get(event_type, 0)

        # Aggregate event types
        for event in summary["customEvents"]:
            summary["customEvents"][event] += record["customEvents"].get(event, 0)

    return summary

# Summarize the records in the file
summarized_record = summarize_records(data["records"])

# Save the summarized data back to a JSON file
with open('pistachioOctober.json', 'w') as output_file:
    json.dump(summarized_record, output_file, indent=2)

print("Summarized data saved to 'elliOctober.json'.")
