package yeet.backend.data;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentLinkedQueue;

@Component
@Slf4j
public class RoomQueue {

    private final ConcurrentLinkedQueue<RoomData> waitingQueue = new ConcurrentLinkedQueue<>();


    // 큐 삽입
    public void addQueue(RoomData roomData){

        waitingQueue.add(roomData);
        log.info("큐에 대기자 추가 roomCode: {}, player: {}", roomData.getRoomCode(), roomData.getPlayer());
    }

    // 큐 대기자 존재 여부
    public boolean isQueue() {
        log.info("큐에 대기자 존재 여부 확인: {}", !waitingQueue.isEmpty());
        return !waitingQueue.isEmpty();
    }

    // 큐 맨 앞 대기자 추출 (큐에서 삭제)
    public RoomData pollQueue() {

        RoomData roomData = waitingQueue.poll();

        return roomData;
    }

    // 특정 방 코드를 가진 대기 데이터(QueueData)를 큐에서 추출 (큐에 데이터는 그대로)
    public RoomData founcQueue(String roomCode){

        return waitingQueue.stream()
                .filter(data -> roomCode.equals(data.getRoomCode()))
                .findFirst()
                .orElse(null);
    }

    // 큐에서 특정 QueueData 삭제
    public void removeQueue(RoomData roomData){
        waitingQueue.remove(roomData);
        log.info("큐에서 대기자 제거 roomCode: {}, player: {}", roomData.getRoomCode(), roomData.getPlayer());
    }
}
