/**
 * 
 */
package com.cisco.cmad.event.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cisco.cmad.event.dao.Event;
import com.cisco.cmad.event.dao.EventType;
import com.cisco.cmad.event.dao.EventTypeWithCount;

/**
 * @author sakahuja use JPA instead
 *
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventTypeWithCount(e.type as type, COUNT(e.id) as cnt) FROM Event e GROUP BY e.type")
	List<EventTypeWithCount> getCountGroupByType();
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e where e.type = :eventType")
	List<EventType> getEventByType(@Param("eventType") String eventType);

}