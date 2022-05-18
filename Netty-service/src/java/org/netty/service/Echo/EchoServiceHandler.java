package org.netty.service.Echo;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

/**
 * @author zhangyuxi, {@literal <zhangyuxi@leyantech.com>}
 * @date 2022-05-16.
 */
@Sharable
public class EchoServiceHandler extends ChannelInboundHandlerAdapter {

  @Override
  public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
    final ByteBuf buf = (ByteBuf) msg;
    System.out.println("service received:" + buf.toString());
    ctx.write(buf);
  }

  @Override
  public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
    ctx.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE);
  }

  @Override
  public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
      throws Exception {
    cause.printStackTrace();
    ctx.close();
  }
}
