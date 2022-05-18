package org.netty.service.Echo;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import lombok.AllArgsConstructor;

import java.net.InetSocketAddress;

/**
 * @author zhangyuxi, {@literal <zhangyuxi@leyantech.com>}
 * @date 2022-05-17.
 */
@AllArgsConstructor
public class EchoServer {

  private final int port = 8080;


  public static void main(String[] args) throws InterruptedException {
    new EchoServer().start();
  }

  public void start() throws InterruptedException {
    final EchoServiceHandler echoServiceHandler = new EchoServiceHandler();
    final NioEventLoopGroup eventExecutors = new NioEventLoopGroup();
    try {
      final ServerBootstrap serverBootstrap = new ServerBootstrap();
      serverBootstrap.group(eventExecutors).channel(NioServerSocketChannel.class)
          .localAddress(new InetSocketAddress(port)).childHandler(
              new ChannelInitializer<SocketChannel>() {
                protected void initChannel(SocketChannel ch) throws Exception {
                  ch.pipeline().addLast(echoServiceHandler);
                }
              });
      final ChannelFuture channelFuture = serverBootstrap.bind().sync();
      channelFuture.channel().closeFuture().sync();
    } finally {
      eventExecutors.shutdownGracefully().sync();
    }
  }
}
