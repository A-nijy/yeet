package yeet.backend.data;

import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentLinkedQueue;

@Component
public class RoomQueue {

    private final ConcurrentLinkedQueue<QueueData> waitingQueue = new ConcurrentLinkedQueue<>();


    // 큐 삽입
    public void addQueue(QueueData queueData){

        waitingQueue.add(queueData);
    }

    // 큐 대기자 존재 여부
    public boolean isQueue() {

        return !waitingQueue.isEmpty();
    }

    // 큐 맨 앞 대기자 추출 (큐에서 삭제)
    public QueueData pollQueue() {

        QueueData queueData = waitingQueue.poll();

        return queueData;
    }


}
