/**
 * 
 */
package com.cisco.cmad.event.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cisco.cmad.event.dao.Event;
import com.cisco.cmad.event.dao.EventType;
import com.cisco.cmad.event.dao.EventTypeWithCount;
import com.cisco.cmad.event.enums.EventTypeEnum;

/**
 * @author sakahuja
 *
 */
@Service
public class EventService implements EventServiceIntf {

	@Autowired
	private EventRepository eventRepository;

	@Override
	public void addEvent(Event event) {

		/*
		 * List<School> schoollist = new ArrayList<School>();
		 * 
		 * for(School school: city.getSchools()) { school.setCity(city);
		 * schoollist.add(school); } city.setSchools(new
		 * HashSet<School>(schoollist));
		 */
		eventRepository.save(event);
	}

	@Override
	public List<Event> getEvents(EventTypeEnum eventTypeEnum) {
		List<Event> eventsList = null;
		if (EventTypeEnum.ALL == eventTypeEnum) {
			Iterable<Event> events = eventRepository.findAll();
			eventsList = new ArrayList<Event>();
			for (Event event : events) {
				eventsList.add(event);
			}
		}
		return eventsList;
	}

	@Override
	public Map<String, Long> getEventCountByType() {

		List<EventTypeWithCount> listofEventTypesWithCount = eventRepository
				.getCountGroupByType();

		Map<String, Long> eventCountMapByType = new HashMap<String, Long>();
		for (EventTypeWithCount eventTypeByCount : listofEventTypesWithCount) {
			eventCountMapByType.put(eventTypeByCount.getType(),
					eventTypeByCount.getCnt());
		}

		return eventCountMapByType;
	}

	@Override
	public List<Event> getEventsByType(String eventType) {
		List<EventType> eventsByType = eventRepository
				.getEventByType(eventType);
		List<Event> events = new ArrayList<Event>();
		for (EventType event : eventsByType) {
			events.add(event.getEvent());
		}
		return events;
	}

}