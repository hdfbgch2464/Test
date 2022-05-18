package org.netty.client;

import io.netty.bootstrap.Bootstrap;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.sctp.nio.NioSctpChannel;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import lombok.AllArgsConstructor;

import java.net.InetSocketAddress;

/**
 * @author zhangyuxi, {@literal <zhangyuxi@leyantech.com>}
 * @date 2022-05-17.
 */
@AllArgsConstructor
public class EchoClient {

  private final String host;

  private final int port;

  public static void main(String[] args) throws InterruptedException {
    new EchoClient("127.0.0.1",8080).start();
  }

  public void start() throws InterruptedException {
    final NioEventLoopGroup eventExecutors = new NioEventLoopGroup();
    try {
      final Bootstrap bootstrap = new Bootstrap();
      bootstrap.group(eventExecutors).channel(NioSocketChannel.class)
          .remoteAddress(new InetSocketAddress(host,port)).handler(
              new ChannelInitializer<SocketChannel>() {
                protected void initChannel(SocketChannel ch) throws Exception {
                  ch.pipeline().addLast(new EchoClientHandler());
                }
              });
      final ChannelFuture channelFuture = bootstrap.connect().sync();
      channelFuture.channel().closeFuture().sync();
    } finally {
      eventExecutors.shutdownGracefully().sync();
    }
  }
}
